import styled from 'styled-components';
import { VideoData } from '../../../interface/VideoData';
import VideoClass from './VideoClass';
function FindXY(props: { data: VideoData[] }) {
  const datas = props.data;
  return (
    <>
      <AbledInfoRectange>
        <ClassName>Class</ClassName>
        <Info>time</Info>
      </AbledInfoRectange>
      {datas.map((data: VideoData, id: number) => (
        <AbledInfoRectange key={id}>
          <VideoClass data={data.class} />
          <Info>{data.time}</Info>
        </AbledInfoRectange>
      ))}
    </>
  );
}
export default FindXY;

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
  width: 200px;
  text-align: center;
`;
