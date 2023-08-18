import React,{useState,useRef,useEffect } from 'react'
import styled from 'styled-components';
import VideoCounter from './hook/VideoCounter';
import FindXY from './hook/FindXY';
import FindClass from './hook/FindClass';
import { ReactComponent as DragImage} from "../../svg/upload-box-group.svg"
import { ReactComponent as Icon} from "../../svg/icon.svg"
import { previewvideo, videoupload } from '../../apis/video';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getid } from '../../store/video';
import DownButton from '../../component/Button';
function Video()
{
    const [datas,setDatas]=useState<any[]>([]);
    const [label,setLabel]=useState<number[]>([0,0,0,0])
    const [loading,setLoading]=useState<boolean>(false);
    const [show,setShow]=useState<boolean>(false);
    const [drop,setDrop]=useState<boolean>(false);
    const id = useSelector((store: RootState)=>store.video.id)
    const dispatch = useDispatch();
    //ref
    const inputRef = useRef<any>(null);
    function HandleCancel()
    {
        window.location.reload();
    }
    const PreviewHandler = async() =>{
        const video = document.getElementById("video") as HTMLVideoElement;
        const source = document.getElementById("source") as HTMLVideoElement
        try{
            const res = await previewvideo(id)
            console.log(res)
            const videourl = URL.createObjectURL(res.data)
            source.src = videourl;
            video.load();
        }catch(err)
        {
            console.log(err)
        }
    }
    useEffect( ()=>{
    const input = inputRef.current;
    
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
        setShow(false);
        setLoading(true)
        event.preventDefault();
        DropVideo(event);
    }
    const DropVideo = async(event : DragEvent)=>
    {
        if(event.dataTransfer)
        {
            setDrop(true)
            const preload = document.querySelectorAll<HTMLElement>('.preload')
            preload.forEach( (preload) => preload.style.display="none")
            console.log(event.dataTransfer.files[0]);
            const f = event.dataTransfer.files[0];
            const formData = new FormData();
            formData.append("video", f);
            try{
                const response = await videoupload(formData)
                console.log(response)
                setDatas(response.data[3])
                console.log(response.data[0].video_id)
                dispatch(getid(response.data[0].video_id))
                const copylabel = VideoCounter(response.data[3])
                setLabel(copylabel);
            }catch(err)
            {
                console.log(err);
            }
            finally{
                setLoading(false)
                setShow(true)
                setTimeout(() => {
                    setDrop(false)
                  }, 2000);
            }
        }
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
     },[dispatch,id])
    return(
        <Layer>
        {drop ? ( loading ? 
          <DownButton message="로딩중" /> : 
          <DownButton 
          message="로딩완료" 
          isfadeout={true}/>) 
          : null}
        <UploadBox>
            <BoldText1>동영상을 업로드 해주세요</BoldText1>
            <form>
            <Input  type="file" id="input-file-upload" multiple={true} />
            <Label ref={inputRef} htmlFor="input-file-upload" >
                <DragImage/>
            </Label>
            </form>
        </UploadBox>
        <DisabledBox>
        <ButtonLayer>
        <BoldText>블러처리된 영상 미리보기</BoldText>
        {(!loading && datas.length !== 0) && <><CancelBtn onClick={HandleCancel}>취소</CancelBtn><DownloadBtn onClick={PreviewHandler}><Icon />영상보기</DownloadBtn></> }
        </ButtonLayer>
        {!loading ? (<VideoBox controls id="video" $isflex={show}>
        <source id ="source" src="">
        </source>
        </VideoBox>) : null}
        <DisabledRectangle className='preload'>동영상을 먼저 업로드해주세요.</DisabledRectangle>
        { loading && <DisabledRectangle>로딩중 입니다. 기다려주세요</DisabledRectangle>}
        </DisabledBox>
        <DisabledInfoBox>
            <BoldText1>탐색된 좌표</BoldText1>
            <DisabledInfoRectangle className='preload'>동영상을 먼저 업로드해주세요.</DisabledInfoRectangle>
            { loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
            { (!loading && datas.length !== 0) && <FindXY data={datas}/> }
        </DisabledInfoBox>
        <DisabledInfoBox>
            <BoldText1>탐색된 클래스</BoldText1>
            <DisabledInfoRectangle className='preload'>동영상을 먼저 업로드해주세요.</DisabledInfoRectangle>
            { loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
            { (!loading && datas.length !== 0) && <FindClass label={label}/> }
        </DisabledInfoBox>
        </Layer>

    )
}
export default Video

const Layer = styled.div`
width : 80%;
margin : 0 197px;
display : flex;
flex-wrap: wrap;
gap : 27px;
position: relative;
`
const VideoBox  = styled.video<{$isflex : boolean}>`
display: ${props => props.$isflex ? 'flex' : 'none'} ;
width : 752px;
height : 398px;
max-width: 752px;
max-height: 398px;
`;

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