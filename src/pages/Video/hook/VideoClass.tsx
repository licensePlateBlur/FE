import styled from 'styled-components';
import ClassNameTransfer from '../../../hook/ClassNameTransfer';
const VideoClass = (props: { data: string }) => {
  const deepcopy = JSON.parse(JSON.stringify(props.data)) as string;
  const Classes = deepcopy.split('/');
  return (
    <>
      {Classes.map((Class: string, index: number) => (
        <ClassName key={index}>{ClassNameTransfer(Class)}</ClassName>
      ))}
    </>
  );
};

export default VideoClass;

const ClassName = styled.div`
  width: 80px;
  color: #ebb929;
  text-align: center;
  font-family: Pretendard;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
`;
