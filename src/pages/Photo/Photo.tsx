import React,{useState,useRef,useEffect } from 'react'
import styled from 'styled-components';
import { ReactComponent as DragImage} from "../../svg/upload-box-group.svg"
import { ReactComponent as Icon} from "../../svg/icon.svg"
import { canvassave, photoupload } from '../../apis/photo';
import Counter from '../../hook/Counter';
import ResizeImage from '../../hook/ResizeImage';
import FindXY from './hook/FindXY';
import FindClass from './hook/FindClass';
import DownButton from '../../component/Button';
import TransferCanvastoJpg from './hook/TransferCanvastoJpg';
import { useDispatch, useSelector } from 'react-redux';
import { getfilename } from '../../store/photo';
import { RootState } from '../../store/store';


function Photo(){
    const [checkm,setCheckm]=useState([true,true,true]);
    const [datas,setDatas]=useState<any[]>([]);
    const [label,setLabel]=useState<number[]>([0,0,0,0])
    const [loading,setLoading]=useState<boolean>(false);
    const [downloading,setDownloading]=useState<boolean>(false);
    const [click,setClick]=useState<boolean>(false);
    const file = useSelector((store: RootState)=>store.file.filename)
    const dispatch = useDispatch();
    // ref
    const canvasRef = useRef<any>(null);
    const inputRef = useRef<any>(null);
    const blurRef = useRef<any>(null);
    const hoverRef = useRef<any>(null);
    function HandleCancel()
    {
        window.location.reload();
    }
    const SaveHandler = async(event : React.MouseEvent<HTMLButtonElement>) =>
    {
      setClick(true);
      setDownloading(true);
      event.preventDefault()
      console.log("click");
      const blur = document.getElementById('blur') as HTMLCanvasElement;
      if(blur)
      {
      try{
          await canvassave(TransferCanvastoJpg(blur,file));
      }catch(error)
      {
        console.log(error);
      }
      finally{
        setDownloading(false);
        setTimeout(() => {
          setClick(false)
        }, 2000);
      }
      }
    }
    useEffect(()=>{
        const input = inputRef.current; //어떤 객체가 만들어진다고 했는데 이게 이벤트 리스너랑 같은 역활을 한다.
        const canvas = canvasRef.current;
        const blur=blurRef.current;
        const hover=hoverRef.current;
        const context = canvas.getContext('2d',{ willReadFrequently: true });
        const blurctx = blur.getContext('2d',{ willReadFrequently: true });
        const hoverctx = hover.getContext('2d',{ willReadFrequently: true });
        // Handle dragover event
        function handleDragOver(event:DragEvent) {
            event.preventDefault();
            input.style.transform = 'scale(1.03)';
        }
        function handleDragLeave(event:DragEvent){
            event.preventDefault();
            input.style.transform = 'scale(1.0)';
        }
        function handleDrop(event : DragEvent) {
            input.style.transform = 'scale(1.0)';
            setLoading(prev => !prev)
            event.preventDefault();
            DrawImage(event);
        }
        const DrawImage = async(event : DragEvent) =>{
            if(context !==null)
            {
              canvas.style.display="none"
              blur.style.display="none"
              hover.style.display="none"
            }
            if(event.dataTransfer)
            {
                const preload = document.querySelectorAll<HTMLElement>('.preload')
                preload.forEach( (preload) => preload.style.display="none")
                console.log(event.dataTransfer.files[0]);
                const f = event.dataTransfer.files[0];
                const resizedImage = await ResizeImage(f, 752, 398);
                const formData = new FormData();
                formData.append("image", resizedImage);
                try{
                    const response = await photoupload(formData);
                    setDatas(response.data)
                    dispatch(getfilename(f.name))
                    const copylabel = Counter(response.data)
                    setLabel(copylabel);
                    setLoading(prev => !prev)
                    canvas.style.display="flex"
                    blur.style.display="flex"
                    hover.style.display="flex"
                }
        catch(err)
        {
            console.log(err)
        }
         ////////////////////////////////////////좌표값을 받아오고 진행
        const img = new Image();
        img.src =  URL.createObjectURL(resizedImage);
        img.onload = () => {
          canvas.width=img.naturalWidth;
          canvas.height=img.naturalHeight;
          blur.width = img.naturalWidth;
          blur.height= img.naturalHeight;
          hover.width = img.naturalWidth;
          hover.height = img.naturalHeight;

          //이미지가 로딩되면 한번 초기화 시키고
          context.clearRect(0,0, canvas.width, canvas.height);
          //이미지를 로딩
          context.drawImage(img, 0, 0,canvas.width, canvas.height); //원본
          blurctx.drawImage(img, 0, 0,canvas.width, canvas.height); //블라인드도 원본으로 초기화
        };

        }
        }
        function SetBlindCheck(i : number)
        {
          let copy =[...checkm];
          copy[i]=!copy[i];
          setCheckm(copy);
        }
        function BlurOn(x1: number, y1: number, width1: number, height1: number)
        {
              console.log("on");
              var imageData = context.getImageData(x1,y1,width1,height1); //원하는 좌표가 될것
              console.log(imageData.data);
    
                const pixels = imageData.data;
                const width = imageData.width;
                const height = imageData.height;
                for (let y = 0; y < height; y += 15) {
                  for (let x = 0; x < width; x += 15) {
                    let r = 0, g = 0, b = 0;
                    let count = 0;
              
                    // Sum the RGB values of each pixel in the tile
                    for (let dy = 0; dy < 15 && y + dy < height; dy++) {
                      for (let dx = 0; dx < 15 && x + dx < width; dx++) {
                        const index = ((y + dy) * width + (x + dx)) * 4;
                        r += pixels[index];
                        g += pixels[index + 1];
                        b += pixels[index + 2];
                        count++;
                      }
                    }
              
                    // Calculate the average RGB value for the tile
                    const avgR = Math.floor(r / count);
                    const avgG = Math.floor(g / count);
                    const avgB = Math.floor(b / count);
              
                    // Set the RGB values of each pixel in the tile to the average value
                    for (let dy = 0; dy < 15 && y + dy < height; dy++) {
                      for (let dx = 0; dx < 15 && x + dx < width; dx++) {
                        const index = ((y + dy) * width + (x + dx)) * 4;
                        pixels[index] = avgR;
                        pixels[index + 1] = avgG;
                        pixels[index + 2] = avgB;
                      }
                    }
                  }
                }
            blurctx.putImageData(imageData, x1 , y1);
        }
        function BlurOff(x : number, y: number, width: number, height: number)
        {
            console.log("off");
            var imageData = context.getImageData(x,y,width,height); //원하는 좌표가 될것
            console.log(imageData);
            blurctx.putImageData(imageData, x , y); //블라인드를 매꾼다.
        }
    function ClickHandler(event : MouseEvent)
    {
      event.preventDefault();
      const x = event.offsetX;
      const y = event.offsetY;
    
      
      // eslint-disable-next-line array-callback-return
      datas.map( (data : any,i ) => {
        if(x >= data.xmin && x <= data.xmax && y>=data.ymin && y<= data.ymax)
        {
          console.log(i);
          if(checkm[i]) //true는 블라인드를 할수 있다.
          {
            BlurOn(data.xmin, data.ymin, data.xmax-data.xmin, data.ymax - data.ymin);
            SetBlindCheck(i);
          }
          else{ //false는 블라인드를해제할수 있다.
            BlurOff(data.xmin, data.ymin, data.xmax-data.xmin, data.ymax- data.ymin);
            SetBlindCheck(i);
          }
        }
      })
      console.log(checkm);
    }
    function MouseMoveHandler(event : MouseEvent)
    {
      event.preventDefault();
      const x = event.offsetX;
      const y = event.offsetY;
      // eslint-disable-next-line array-callback-return
      datas.map( (data:any )=>{
        console.log(y);
      if(x >= data.xmin && x <= data.xmax && y>=data.ymin && y<= data.ymax)
      {
        hoverctx.strokeStyle = "red";
        console.log(Math.floor(data.ymax)-Math.floor(data.ymin));
        hoverctx.strokeRect(data.xmin, data.ymin, Math.floor(data.xmax)-Math.floor(data.xmin), Math.floor(data.ymax)-Math.floor(data.ymin));
      }
      else if ( x >= 0 && x <=hover.width && y>=0 && y<= hover.height ){
        hoverctx.strokeStyle = "blue";
        hoverctx.strokeRect(data.xmin, data.ymin, Math.floor(data.xmax)-Math.floor(data.xmin), Math.floor(data.ymax)-Math.floor(data.ymin));
      }
      else{
        hoverctx.clearRect(0,0, hover.width, hover.height);
      }

    })
    }
    function MouseOutHandler(event : MouseEvent)
    {
      event.preventDefault();
      hoverctx.clearRect(0,0, hover.width, hover.height);
    }
        
        //리스너생성
        input.addEventListener('dragover', handleDragOver); //이게 있어야 drop 이 작동됨
        input.addEventListener('dragleave', handleDragLeave);
        input.addEventListener('drop', handleDrop);
        hover.addEventListener('click',ClickHandler);
        hover.addEventListener('mousemove',MouseMoveHandler);
        hover.addEventListener('mouseout',MouseOutHandler);
        return () => {
        //리스너삭제
        input.removeEventListener('dragover', handleDragOver);
        input.addEventListener('dragleave', handleDragLeave);
        input.removeEventListener('drop', handleDrop);
        hover.removeEventListener('click',ClickHandler);
        hover.removeEventListener('mousemove',MouseMoveHandler);
        hover.removeEventListener('mouseout',MouseOutHandler);
        };
    },[datas,label,checkm,dispatch])
    return(
        <Layer>
          {click ? ( downloading ? 
          <DownButton message="다운로드중" /> : 
          <DownButton 
          message="다운완료" 
          isfadeout={true}/>) 
          : null}
        <UploadBox>
            <BoldText1>사진을 업로드 해주세요</BoldText1>
            <form>
            <Input  type="file" id="input-file-upload" multiple={true} />
            <Label ref={inputRef} htmlFor="input-file-upload">
                <DragImage/>
            </Label>
            </form>
        </UploadBox>
        <DisabledBox>
        <ButtonLayer>
        <BoldText>클릭해서 블러처리를 on/off 하세요</BoldText>
        {(!loading && datas.length !== 0) && <><CancelBtn onClick={HandleCancel}>취소</CancelBtn><DownloadBtn onClick={SaveHandler}><Icon />저장하기</DownloadBtn></> }
        </ButtonLayer>
        <canvas id ="canvas" ref={canvasRef} />
        <canvas id= "blur" ref={blurRef}/>
        <canvas id="hover" ref={hoverRef} />
        <DisabledRectangle className='preload'>사진을 먼저 업로드해주세요.</DisabledRectangle>
        { loading && <DisabledRectangle>로딩중 입니다. 기다려주세요</DisabledRectangle>}
        </DisabledBox>
        <DisabledInfoBox>
            <BoldText1>탐색된 좌표</BoldText1>
            <DisabledInfoRectangle className='preload'>사진을 먼저 업로드해주세요.</DisabledInfoRectangle>
            { loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
            { (!loading && datas.length !== 0) && <FindXY data={datas}/> }
        </DisabledInfoBox>
        <DisabledInfoBox>
            <BoldText1>탐색된 클래스</BoldText1>
            <DisabledInfoRectangle className='preload'>사진을 먼저 업로드해주세요.</DisabledInfoRectangle>
            { loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
            { (!loading && datas.length !== 0) && <FindClass label={label}/> }
        </DisabledInfoBox>
        </Layer>
    )
}

export default Photo

const Layer = styled.div`
width : 80%;
margin : 0 197px;
display : flex;
flex-wrap: wrap;
gap : 27px;
position: relative;
`

const UploadBox = styled.div`
width : 752px;
height: 465px;
margin-top : 111px;
`
const BoldText = styled.div`
color: #000;
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 700;
letter-spacing: -0.32px;
`
const BoldText1 = styled.div`
color: #000;
font-family: Pretendard;
font-size: 30px;
font-style: normal;
font-weight: 700;
letter-spacing: -0.32px;
margin-bottom : 31px;
`
const Input = styled.input`
display: none;
`
const Label = styled.label`
  width : 100%;
  height: 398px;
  display : flex;
  align-items: center;
  justify-content: center;
`
const DisabledBox = styled.div`
margin-top : 111px;
width : 752px;
height: 465px;

`
const DisabledRectangle = styled.div`
width : 100%;
height: 398px;
display : flex;
align-items: center;
justify-content: center;
border-radius: 15px;
background: #F9F9F9;
color: #808080;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 135%; /* 32.4px */
letter-spacing: -0.24px;
`
const CancelBtn = styled.button`
width: 96px;
height: 40px;
border-radius: 35px;
background: #F3F3F3;
color: #606060;
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
border:none;
`
const DownloadBtn = styled.button`
width: 158px;
height: 40px;
border-radius: 35px;
background: #000;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
display : flex;
align-items: center;
justify-content: center;
gap : 8px;
padding : 0px;
`
const ButtonLayer = styled.div`
display : flex;
align-items: center;
gap : 5px;
margin-bottom : 31px;
`
const DisabledInfoBox = styled.div`
margin-top : 111px;
width: 752px;
height: 310px;
`
const DisabledInfoRectangle = styled.div`
width : 100%;
height: 245px;
display : flex;
align-items: center;
justify-content: center;
border-radius: 15px;
background: #F9F9F9;
color: #808080;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 135%; /* 32.4px */
letter-spacing: -0.24px;
`
