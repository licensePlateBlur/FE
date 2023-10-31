import React, { useState } from 'react';
import styled from 'styled-components';
import photo from '../img/photo.gif';
function Main() {
  const [currentSection, setCurrentSection] = useState(0);
  const HandleNav = () => {
    setCurrentSection(0);
  };
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      // 스크롤 다운 시
      setCurrentSection(prevSection => (prevSection < 3 ? prevSection + 1 : prevSection));
    } else {
      // 스크롤 업 시
      setCurrentSection(prevSection => (prevSection > 0 ? prevSection - 1 : prevSection));
    }
  };
  return (
    <Container onWheel={handleWheel}>
      <Navigation>
        <div onClick={HandleNav}>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Navigation>
      <Section $current={currentSection === 0}>
        <Img src={photo} alt="사진 gif" />
      </Section>
      <Section $current={currentSection === 1}>
        <h1>2</h1>
      </Section>
      <Section $current={currentSection === 2}>
        <h1>3</h1>
      </Section>
      <Section $current={currentSection === 3}>
        <h1>4</h1>
      </Section>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 116px);
  overflow: hidden;
  position: relative;
`;

const Section = styled.div<{ $current?: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: ${props => (props.$current ? 1 : 0)};
  transition: opacity 1s;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20em;
    font-weight: bold;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  right: 10%;
  font-size: 20px;
  z-index: 3;
`;

const Img = styled.img`
  transform: scale(2);
`;
