import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as Check} from "../svg/check.svg"
function Button ({message,isfadeout=false} : {message : string,isfadeout? : boolean})
{

    return(<ButtonLayer $isfadeout={isfadeout}>
        <Check/> {message}
    </ButtonLayer>)
}

export default Button

const Fadeout = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`
const ButtonLayer = styled.div<{$isfadeout : boolean}>`
width: 165px;
height: 69px;
border-radius: 10px;
background: #000;
box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.10);
color: #FFF;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 35.2px */
letter-spacing: -0.22px;
position : fixed;
top : 1111px;
left: 50%;
transform: translate(-50%, 0);
display : flex;
align-items: center;
justify-content: center;
gap : 12px;
animation: ${props=> props.$isfadeout ? css`${Fadeout} 2s` : 'none'}
`