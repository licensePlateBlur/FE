import styled from 'styled-components'
import { ReactComponent as Plus} from '../svg/plus.svg'
function UploadBtn( props : { message : string, href : string})
{
    const handlebutton = () =>{
        window.location.href=props.href
    }
    //event를 사용하지않으면 제거하는게 좋다!
    return(
        <ButtonLayer onClick={handlebutton}> 
            <Plus/> {props.message} 
        </ButtonLayer>
    )
}

export default UploadBtn

const ButtonLayer = styled.button`
width: 160px;
height: 50px;
display : flex;
align-items: center;
justify-content: center;
gap : 8px;
border-radius: 10px;
background: #000;
color: #FFF;
text-align: right;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 135%; /* 27px */
letter-spacing: -0.2px;
`