import React,{ Component,useState,useRef,useEffect } from 'react'
import styled from 'styled-components';
import { ReactComponent as DragImage} from "../svg/upload-box-group.svg"
import { upload } from '../apis/photo';
import Counter from './Counter';

function Photo(){
    const [datas,setDatas]=useState([]);
    const [label,setLabel]=useState([0,0,0,0])
    const [loading,setLoading]=useState(false);
    // ref
    const canvasRef = useRef<any>(null);
    const inputRef = useRef<any>(null);
    const blurRef = useRef(null);
    const hoverRef = useRef(null);
    useEffect(()=>{
        const input = inputRef.current; //어떤 객체가 만들어진다고 했는데 이게 이벤트 리스너랑 같은 역활을 한다.
        const canvas = canvasRef.current;
        // Handle dragover event
        function handleDragOver(event:DragEvent) {
            event.preventDefault();
            console.log("over")
            input.style.transform = 'scale(1.03)';
        }
        function handleDragLeave(event:DragEvent){
            event.preventDefault();
            console.log("leave")
            input.style.transform = 'scale(1.0)';
        }

        function handleDrop(event : DragEvent) {
            input.style.transform = 'scale(1.0)';
            event.preventDefault();
            DrawImage(event);
          }
        const DrawImage = async(event : DragEvent) =>{
            if(event.dataTransfer)
            {
                console.log(event.dataTransfer.files[0]);
                const f = event.dataTransfer.files[0];
                const formData = new FormData();
                formData.append("image",f);
                try{
                    const response = await upload(formData);
                    setDatas(response.data)
                    const copylabel = Counter(response.data)
                    setLabel(copylabel);       
        }catch(err)
        {
            console.log(err)
        }
        }
        ////////////////////////////////////////좌표값을 받아오고 진행

        }
        
        //리스너생성
        input.addEventListener('dragover', handleDragOver); //이게 있어야 drop 이 작동됨
        input.addEventListener('dragleave', handleDragLeave);
        input.addEventListener('drop', handleDrop);

        return () => {
        //리스너삭제
        input.removeEventListener('dragover', handleDragOver);
        input.addEventListener('dragleave', handleDragLeave);
        input.removeEventListener('drop', handleDrop);
        };
    })
    return(
        <Layer>
        <UploadBox>
            <BoldText>사진을 업로드 해주세요</BoldText>
            <form>
            <Input  type="file" id="input-file-upload" multiple={true} />
            <Label ref={inputRef} htmlFor="input-file-upload">
                <DragImage/>
            </Label>
            </form>
        </UploadBox>
        <DisabledBox>
        <BoldText>클릭해서 블러처리를 on/off 하세요</BoldText>
        <canvas id ="canvas" ref={canvasRef} />
        <canvas id= "blur" ref={blurRef}/>
        <canvas id="hover" ref={hoverRef} />
        { loading ? <>
        <canvas id ="canvas" ref={canvasRef} />
        <canvas id= "blur" ref={blurRef}/>
        <canvas id="hover" ref={hoverRef} />
        </> : <DisabledRectangle>사진을 먼저 업로드해주세요.</DisabledRectangle>}
        </DisabledBox>
        </Layer>
    )
}

export default Photo


const Layer = styled.div`
width : 100%;
margin : 0 197px;
display : flex;
flex-wrap: wrap;
gap : 27px;
`

const UploadBox = styled.div`
margin-top : 111px;
width : 752px;
height: 465px;
`
const BoldText = styled.div`
color: #000;
font-family: Pretendard;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 135%; /* 43.2px */
letter-spacing: -0.32px;
margin-bottom : 18px;
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
  z-index : 10;
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
