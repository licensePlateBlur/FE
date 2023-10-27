import { useState } from "react";

const Signin = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(<>
    <h2>로그인페이지</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userid">아이디</label>
        <input
          id="userid"
          onChange={handleEmailchange}
          placeholder="아이디를 입력해주세요"
        />
        <br />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          onChange={handlePasswordChange}
          placeholder="8자리이상"
        />
        <br />
        <button
          disabled={checkEmail(email) && checkPassword(password) ? false : true}
        >
          로그인
        </button>
      </form>
    
    </>)
}

export default Signin