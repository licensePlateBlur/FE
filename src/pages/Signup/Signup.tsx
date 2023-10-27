import { ChangeEvent, useState } from 'react';
import { checkEmail, checkPassword } from '../../utils/validation';

const Signup = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userid, setUserid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [re_password, setRepassword] = useState<string>('');

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
    //정상 회원가입
    e.preventDefault();
    // const response = await signup();
  };
  return (
    <>
      <h2>회원가입 페이지</h2>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <input onChange={handleUsername} />

        <label>이메일</label>
        <input onChange={handleEmail} />

        <label>아이디</label>
        <input onChange={handleUserid} />

        <label>비밀번호</label>
        <input onChange={handlePassword} />

        <label>비밀번호 확인</label>
        <input onChange={handleRepassword} />

        <button disabled={checkEmail(email) && checkPassword(password) ? false : true}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default Signup;
