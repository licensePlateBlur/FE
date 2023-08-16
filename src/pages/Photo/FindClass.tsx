import styled from 'styled-components';
function FindClass( {label} : {label : number[]})
{
    return(
        <>
        <AbledInfoRectange1>
                <ClassCounterBox>
                    <div>얼굴</div>
                    <div>{label[0]}</div>
                </ClassCounterBox>
                <ClassCounterBox>
                    <div>휴대폰</div>
                    <div>{label[1]}</div>
                </ClassCounterBox>
                <ClassCounterBox>
                    <div>카드</div>
                    <div>{label[2]}</div>
                </ClassCounterBox>
                <ClassCounterBox>
                    <div>번호판</div>
                    <div>{label[3]}</div>
                </ClassCounterBox>
            </AbledInfoRectange1>
        </>
    )
}

export default FindClass
const AbledInfoRectange1 = styled.div`
width : 100%;
height : 86px;
display : flex;
justify-content: space-between;
color: #000;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 400;
`

const ClassCounterBox = styled.div`
width: 160px;
height: 86px;
color: #EBB929;
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
display : flex;
align-items: center;
justify-content: center;
gap : 32px;
border-radius: 15px;
background: #FFFBEF;
`