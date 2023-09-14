import React from 'react';
import styled from 'styled-components';
function FindClass({ label }: { label: number[] }) {
  return (
    <>
      <AbledInfoRectange1>
        <ClassCounterBox $isColor={label[0]}>
          <div>얼굴</div>
          <div className="label">{label[0]}</div>
        </ClassCounterBox>
        <ClassCounterBox $isColor={label[1]}>
          <div>휴대폰</div>
          <div className="label">{label[1]}</div>
        </ClassCounterBox>
        <ClassCounterBox $isColor={label[2]}>
          <div>카드</div>
          <div className="label">{label[2]}</div>
        </ClassCounterBox>
        <ClassCounterBox $isColor={label[3]}>
          <div>번호판</div>
          <div className="label">{label[3]}</div>
        </ClassCounterBox>
      </AbledInfoRectange1>
    </>
  );
}

export default React.memo(FindClass);
const AbledInfoRectange1 = styled.div`
  width: 100%;
  height: 86px;
  display: flex;
  justify-content: space-between;
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
`;

const ClassCounterBox = styled.div<{ $isColor: number }>`
width: 160px;
height: 86px;
color : ${props => (props.$isColor > 0 ? '#EBB929;' : '#363636;')}
background : ${props => (props.$isColor > 0 ? '#FFFBEF;' : '#F9F9F9;')}
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
display : flex;
align-items: center;
justify-content: center;
gap : 32px;
border-radius: 15px;
& > .label{
    font-weight: 900;
    color : ${props => (props.$isColor > 0 ? '#EBB929;' : '#9E9E9E;')}
}
`;
