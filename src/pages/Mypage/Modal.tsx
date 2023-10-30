import styled from 'styled-components';
const Modal = () =>{

    return(<ModalLayout>
        <ModalContext>
            <Title>정말로 탈퇴하시겠습니까?</Title>
        </ModalContext>
    </ModalLayout>);
}
export default Modal


const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContext = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display : flex;
`

const Title = styled.div`
  width : 100%;
  color: #000;
  font-size: 32px;
  text-align : center;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 20px;
`

