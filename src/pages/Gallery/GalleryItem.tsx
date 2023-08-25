import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Download } from '../../svg/download.svg';
import { ReactComponent as Trash } from '../../svg/trash.svg';
import { GalleryData } from '../../interface/GalleryData';
import formatBytes from './hook/FormatByte';
import FormatData from './hook/FormatDate';
interface ItemProps {
  file: GalleryData;
  DownloadHandler: (id: number, event: React.MouseEvent<HTMLDivElement>) => void;
  DeleteHandler : (id : number) => void;
}

function GalleryItem({ file, DownloadHandler,DeleteHandler }: ItemProps) {
  return (
    <ListItemBox>
      <Name $size="50%">{file.ORIGINAL_FILE_NAME}</Name>
      <Text $size="10%">{FormatData(file.CREATED_DATE)}</Text>
      <Text $size="10%">{file.FILE_TYPE}</Text>
      <Text $size="10%">{formatBytes(file.FILE_SIZE)}</Text>
      <Text
        $size="10%"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => DownloadHandler(file.ID, event)}
      >
        <Download />
      </Text>
      <Text
        $size="10%"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => DeleteHandler(file.ID)}
      >
        <Trash/>
      </Text>
    </ListItemBox>
  );
}

export default GalleryItem;

const ListItemBox = styled.div`
width : 100%
border-radius: 10px;
background: #FFF;
box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.10);
color: #363636;
font-family: Pretendard;
font-size: 21px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 33.6px */
letter-spacing: -0.21px;
padding : 23px;
display : flex;
flex-direction: row;
`;
const Text = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  text-align: center;
`;
const Name = styled.div<{ $size: string }>`
  width: ${props => props.$size};
`;
