import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import UploadBtn from '../../component/UploadBtn';
import GalleryItem from './GalleryItem';
import { GalleryData } from '../../interface/GalleryData';
import { getfiles } from '../../apis/gallery';
import DownButton from '../../component/Button';
function Gallery()
{
    const [datas,setDatas]=useState<GalleryData[]>([]);
    const [downloading,setDownloading]=useState<boolean>(false);
    const [click,setClick]=useState<boolean>(false);
    useEffect( ()=>{
        const GetFiles = async() =>{
            try{
                const response = await getfiles()
                setDatas(response.data)
            }catch(err)
            {
                console.log(err)
            }
        }
        GetFiles()
    },[])
    const DownloadHandler = (id:number, event : React.MouseEvent<HTMLDivElement>) =>{
        setClick(true)
        setDownloading(true)
        event.preventDefault()
        const download = document.createElement('a');
        download.href=`http://localhost:5000/python/download_file/${id}`
        download.setAttribute('download', "다운로드");
        download.click();
        setDownloading(false)
        setTimeout(() => {
            setClick(false)
        }, 1999);
    }
    return(
    <>
    <TitleLayer>
        {click ? ( downloading ? 
          <DownButton message="다운로드중" /> : 
          <DownButton 
          message="다운완료" 
          isfadeout={true}/>) 
          : null}
        <TitleBox>
        <Title>갤러리</Title>
        <UploadLayer>
            <UploadBtn message="사진 업로드" href="/photo"></UploadBtn>
            <UploadBtn message="영상 업로드" href="/video"></UploadBtn>
            <UploadBtn message="실시간 촬영" href="/realtime"></UploadBtn>
            </UploadLayer>
        </TitleBox>
    </TitleLayer>
    <ListLayer>
            <ListTitle>
            <Name $size='60%'>파일 이름</Name>
            <Text $size='10%'>생성일</Text>
            <Text $size='10%'>파일타입</Text>
            <Text $size='10%'>파일크기</Text>
            <Text $size='10%'>다운로드</Text>
            </ListTitle>
            <ListItemLayer>
                {datas.map((data : GalleryData,id:number )=>(
                    <GalleryItem
                    key={data.ID}
                    file={data}
                    DownloadHandler={DownloadHandler}
                    />
                ))}
            </ListItemLayer>
    </ListLayer>
    </>
    )
}

export default Gallery


const TitleLayer = styled.div`
width : 80%;
margin : 0 160px;
padding-bottom : 44px;
border-bottom : 2px solid #E2E2E2;
`
const Title = styled.div`
color: #000;
font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 500;
line-height: 135%; /* 48.6px */
letter-spacing: -0.36px;
margin-top : 88px;
margin-bottom : 51px;
`
const UploadLayer = styled.div`
display : flex;
flex-direction: row;
gap : 20px;
`
const TitleBox =styled.div`
display : flex;
flex-direction: column;
`
const ListLayer = styled.div`
width : 78%;
margin : 0 196px;
`
const ListTitle = styled.div`
display : flex;
flex-direction: row;
color: #363636;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 28.8px */
letter-spacing: -0.18px;
padding : 23px;
`
const Text = styled.div<{$size : string}>`
width : ${ (props)=>props.$size};
text-align : center;
`
const Name = styled.div<{$size : string}>`
width : ${ (props)=>props.$size};
`
const ListItemLayer = styled.div`
display: flex;
flex-direction: column;
gap : 16px;
`