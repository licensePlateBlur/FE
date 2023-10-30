import { ChangeEvent, useState } from 'react';
import { signup } from '../../apis/auth';
import styled from 'styled-components';
import { checkEmail, checkMissInPut, comparePassword } from '../../utils/validation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('@');
  const [userid, setUserid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [re_password, setRepassword] = useState<string>('');
  const navigate = useNavigate();

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleUserid = (e: ChangeEvent<HTMLInputElement>) => {
    setUserid(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRepassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepassword(e.target.value);
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signup({ username, email, userid, password });
      if (response.status === 200) {
        alert('회원가입을 성공했습니다.');
        navigate('/signin');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          alert(err.response.data.message);
        } else if (err.code === 'ERR_NETWORK') {
          alert('502 BAD GATEWAY');
        } else {
          console.log(err);
          alert('알수 없는 에러 발생');
        }
      }
    }
  };
  return (
    <SignUpLayout>
      <Title>회원가입 페이지</Title>
      <FormLayout onSubmit={handleSubmit}>
        <GapLayer>
          <LabelLayer htmlFor="username">이름</LabelLayer>
          <InputLayer id="username" onChange={handleUsername} placeholder="이름을 입력해주세요" />
        </GapLayer>
        <GapLayer>
          <LabelLayer htmlFor="email">이메일</LabelLayer>
          <InputLayer id="email" onChange={handleEmail} placeholder=" `@`을 포함해주세요" />
          {!checkEmail(email) && <span>@를 포함해주세요</span>}
        </GapLayer>
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
        <GapLayer>
          <LabelLayer htmlFor="repassword">비밀번호 확인</LabelLayer>
          <InputLayer
            id="repassword"
            onChange={handleRepassword}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            type="password"
          />
          {!comparePassword(password, re_password) && <span>비밀번호가 일치하지 않습니다.</span>}
        </GapLayer>
        <SignUpButton
          disabled={
            !checkEmail(email) ||
            !comparePassword(password, re_password) ||
            !checkMissInPut({ email, password, userid, username })
              ? true
              : false
          }
          $disabled={
            !checkEmail(email) ||
            !comparePassword(password, re_password) ||
            !checkMissInPut({ email, password, userid, username })
              ? true
              : false
          }
        >
          회원가입
        </SignUpButton>
      </FormLayout>
    </SignUpLayout>
  );
};

export default Signup;

const SignUpLayout = styled.div`
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

const SignUpButton = styled.button<{ $disabled: boolean }>`
  height: 62px;
  font-size: 28px;
  border-radius: 7px;
  border: none;
  background: ${props => (props.$disabled ? '#D9D9D9' : '#fedd33')};
  color: #000;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
