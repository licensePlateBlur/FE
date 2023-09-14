import React from 'react';
import styled from 'styled-components';
import { PhotoData } from '../../../interface/PhotoData';
import ClassNameTransfer from '../../../hook/ClassNameTransfer';
function FindXY(props: { datas: PhotoData[] }) {
  const datas = props.datas;
  return (
    <>
      <AbledInfoRectange>
        <ClassName>Class</ClassName>
        <Info>Per</Info>
        <Info>Xmax</Info>
        <Info>Xmin</Info>
        <Info>Ymax</Info>
        <Info>Ymin</Info>
      </AbledInfoRectange>
      {datas.map((data: PhotoData, id: number) => (
        <AbledInfoRectange key={id}>
          <ClassName>{ClassNameTransfer(data.name)}</ClassName>
          <Info>{Math.round(data.confidence * 100)}%</Info>
          <Info>{Math.floor(data.xmax)}</Info>
          <Info>{Math.floor(data.xmin)}</Info>
          <Info>{Math.floor(data.ymax)}</Info>
          <Info>{Math.floor(data.ymin)}</Info>
        </AbledInfoRectange>
      ))}
    </>
  );
}
export default React.memo(FindXY);

const AbledInfoRectange = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  border-radius: 15px;
  background: #fffbef;
  height: 86px;
`;
const ClassName = styled.div`
  width: 80px;
  color: #ebb929;
  text-align: center;
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
`;
const Info = styled.div`
  width: 80px;
  text-align: center;
`;
