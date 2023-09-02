import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getfile } from '../../apis/gallery';
import { GalleryData } from '../../interface/GalleryData';
interface ItemProps {
  file: GalleryData;
  DownloadHandler: (id: number, event: React.MouseEvent<HTMLDivElement>) => void;
  DeleteHandler: (id: number) => void;
}
const GridItem: React.FC<ItemProps> = ({
  file: { ID, ORIGINAL_FILE_NAME },
  DownloadHandler,
  DeleteHandler,
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const GetImage = async (id: number) => {
      try {
        const response = await getfile(id);
        setImageUrl(response.data);
      } catch (err: unknown) {
        console.log('get image failed');
      }
    };
    GetImage(ID);
  }, [ID]);
  return (
    <ListItemBox>
      <Img src={imageUrl} alt="이미지" />
      <Layer>
        <FileName>{ORIGINAL_FILE_NAME}</FileName>
        <Download>다운로드</Download>
      </Layer>
    </ListItemBox>
  );
};
export default GridItem;

const ListItemBox = styled.div`
  width: 17%;
  height: 323px;
  display: flex;
  flex-direction: column;
  color: #363636;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  padding: 0px;
`;
const Img = styled.img`
  width: 100%;
  height: 235.226px;
`;

const FileName = styled.div`
  color: #363636;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.16px;
`;

const Layer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Download = styled.div`
  width: 42px;
  height: 22px;
  border-radius: 5px;
  background: #fff6dc;
  color: #ebb929;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;
