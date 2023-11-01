import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getuser } from '../../apis/mypage';
import Modal from './Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
interface UserInfo {
  ID: string;
  USERNAME: string;
  EMAIL: string;
  FILECOUNT: number;
}
const MyPage = () => {
  const [user, setUser] = useState<UserInfo>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const HandleModal = () => setIsModalOpen(prev => !prev);
  const GetUserHandler = async () => {
    try {
      const response = await getuser();
      setUser(response.data);
    } catch (err) {
      if(axios.isAxiosError(err))
      {
        if(err.response?.status === 401)
        {
            toast.warn('토큰이 만료되었습니다. 다시 로그인 해주세요', {
            position: toast.POSITION.TOP_CENTER,
          })
        }
        else if (err.code === 'ERR_NETWORK') {
          toast.warn('502 Bad GateWay !', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log(err);
          toast.error('알수없는 에러 발생!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }
  };
  useEffect(() => {
    GetUserHandler();
  }, []);
  return (
    <MyPageLayout>
      <Title>{user?.USERNAME}님 마이페이지</Title>
      <UserLayout>
        <GapLayer>
          <UserTitle>이름 : </UserTitle>
          <Content>{user?.USERNAME}</Content>
        </GapLayer>
        <GapLayer>
          <UserTitle>이메일 : </UserTitle>
          <Content>{user?.EMAIL}</Content>
        </GapLayer>
        <GapLayer>
          <UserTitle> 다운로드 한 개수 : </UserTitle>
          <Content> {user?.FILECOUNT}개</Content>
        </GapLayer>
        <SignUpButton onClick={HandleModal}>회원탈퇴</SignUpButton>
      </UserLayout>
      {isModalOpen ? <Modal HandleModal={HandleModal} /> : null}
    </MyPageLayout>
  );
};

export default MyPage;

const MyPageLayout = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.div`
  color: #000;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 20px;
`;

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
`;

const Content = styled.div`
  height: 28px;
  border-radius: 5px;
  font-size: 28px;
`;

const UserTitle = styled.div`
  font-size: 28px;
`;

const GapLayer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const SignUpButton = styled.button`
  height: 62px;
  font-size: 28px;
  border-radius: 7px;
  border: none;
  background: #fedd33;
  color: #000;
  cursor: pointer;
`;
