import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { signin } from '../../apis/auth';
import { setLocalStorageToken } from '../../utils/LocalStorage';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Signin = () => {
  const [userid, setUserid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const loaction = useLocation();
  const handleUserid = (e: ChangeEvent<HTMLInputElement>) => {
    setUserid(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signin(userid, password);
      if (response.status === 200) {
        setLocalStorageToken(response.data.access_token);
        toast.success('로그인에 성공했습니다', {
          theme: 'dark',
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            if (loaction.state) {
              navigate(loaction.state.from.pathname);
            } else navigate('/photo');
          },
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.warn('아이디 비밀번호를 확인해주세요', {
            position: toast.POSITION.TOP_CENTER,
          })
        } else if (err.code === 'ERR_NETWORK') {
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

  return (
    <SignInLayout>
      <Title>로그인페이지</Title>
      <FormLayout onSubmit={handleSubmit}>
        <GapLayer>
          <LabelLayer htmlFor="userid">아이디</LabelLayer>
          <InputLayer id="userid" onChange={handleUserid} placeholder="아이디를 입력해주세요" />
        </GapLayer>
        <GapLayer>
          <LabelLayer htmlFor="password">비밀번호</LabelLayer>
          <InputLayer
            id="passwrod"
            onChange={handlePassword}
            placeholder="비밀번호를 입력해주세요"
            type="password"
          />
        </GapLayer>
        <SignUpButton>로그인</SignUpButton>
      </FormLayout>
    </SignInLayout>
  );
};

export default Signin;

const SignInLayout = styled.div`
  width: 500px;
  height: 500px;
  margin: 0 auto;
  margin-top: 50px;
`;
const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
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
const InputLayer = styled.input`
  height: 28px;
  padding: 16px 5px;
  background: #f9f9fd;
  border: 0.5px solid #c9c6e1;
  border-radius: 5px;
  font-size: 20px;
`;

const LabelLayer = styled.label`
  font-size: 28px;
`;

const GapLayer = styled.div`
  display: flex;
  flex-direction: column;
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
