import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import UploadBtn from '../../component/UploadBtn';
import GalleryItem from './GalleryItem';
import { GalleryData } from '../../interface/GalleryData';
import DownButton from '../../component/Button';
import { useGallery, useGalleryChange } from '../../context/GalleryContex';

function Gallery() {
  const loader = useRef<HTMLDivElement | null>(null);
  const datas = useGallery();
  const { addPage }: any = useGalleryChange(); //addPage 타입을 지정해주고 싶었는데 null 처리가 복잡하다 생각하여 any를 사용함
  const [downloading, setDownloading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    // console.log(entries)
    // console.log( "call observerapi")
    const target = entries[0];
    if (target.isIntersecting) {
      addPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const option = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const DownloadHandler = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    setClick(true);
    setDownloading(true);
    event.preventDefault();
    const download = document.createElement('a');
    download.href = `http://localhost:5000/python/download_file/${id}`;
    download.setAttribute('download', '다운로드');
    download.click();
    setDownloading(false);
    setTimeout(() => {
      setClick(false);
    }, 1999);
  };
  if (datas === null) {
    return <div>loading</div>;
  }
  return (
    <>
      <TitleLayer>
        {click ? (
          downloading ? (
            <DownButton message="다운로드중" />
          ) : (
            <DownButton message="다운완료" isfadeout={true} />
          )
        ) : null}
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
          <Name $size="60%">파일 이름</Name>
          <Text $size="10%">생성일</Text>
          <Text $size="10%">파일타입</Text>
          <Text $size="10%">파일크기</Text>
          <Text $size="10%">다운로드</Text>
        </ListTitle>
        <ListItemLayer>
          {datas.map((data: GalleryData, id: number) => (
            <GalleryItem key={data.ID} file={data} DownloadHandler={DownloadHandler} />
          ))}
        </ListItemLayer>
        <Title ref={loader}>Loading...</Title>
      </ListLayer>
    </>
  );
}

export default Gallery;

const TitleLayer = styled.div`
  width: 80%;
  margin: 0 160px;
  padding-bottom: 44px;
  border-bottom: 2px solid #e2e2e2;
`;
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 48.6px */
  letter-spacing: -0.36px;
  margin-top: 88px;
  margin-bottom: 51px;
`;
const UploadLayer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListLayer = styled.div`
  width: 78%;
  margin: 0 196px;
`;
const ListTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #363636;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 28.8px */
  letter-spacing: -0.18px;
  padding: 23px;
`;
const Text = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  text-align: center;
`;
const Name = styled.div<{ $size: string }>`
  width: ${props => props.$size};
`;
const ListItemLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
