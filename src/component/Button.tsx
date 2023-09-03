import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as Check } from '../svg/check.svg';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function Button({ message, isfadeout = false }: { message: string; isfadeout?: boolean }) {
  return (
    <ThemeProvider theme={theme}>
      <ButtonLayer $isfadeout={isfadeout}>
        {isfadeout ? <Check /> : <CircularProgress color="primary" />} {message}
      </ButtonLayer>
    </ThemeProvider>
  );
}

export default Button;
const theme = createTheme({
  palette: {
    primary: {
      main: '#fedd33',
    },
  },
});

const Fadeout = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;
const ButtonLayer = styled.div<{ $isfadeout: boolean }>`
  width: 165px;
  height: 69px;
  border-radius: 10px;
  background: #000;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 35.2px */
  letter-spacing: -0.22px;
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 5;
  animation: ${props =>
    props.$isfadeout
      ? css`
          ${Fadeout} 2s
        `
      : 'none'};
`;
