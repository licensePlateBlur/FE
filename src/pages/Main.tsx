import styled from 'styled-components';

function Main() {
  return <>
  <Section><h1>1</h1></Section>
  <Section><h1>2</h1></Section>
  <Section><h1>3</h1></Section>
  <Section><h1>4</h1></Section>
  </>;
}

export default Main;

const Section = styled.div`
width: 100%; 
height : calc(100% - 116px);
background-color: blueviolet;
border : 1px solid black;
position: relative;
h1{
  position: absolute;
	top: 50%; left: 50%;
	transform: translate(-50%,-50%);
	font-size: 20em;
	font-weight: bold;
	text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6)
}
`