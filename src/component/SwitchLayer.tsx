import styled from 'styled-components';
import { ReactComponent as Darklist } from '../svg/darklist.svg';
import { ReactComponent as Darkgrid } from '../svg/darkgrid.svg';
import { ReactComponent as Whitelist } from '../svg/whitelist.svg';
import { ReactComponent as Whitegrid } from '../svg/whitegrid.svg';
import React from 'react';
interface SwitchProps {
  change: boolean;
  ChangeHandler: () => void;
}
const SwitchLayer: React.FC<SwitchProps> = ({ change, ChangeHandler }) => {
  return (
    <ButtonLayer>
      <ListLayer onClick={ChangeHandler}>{change ? <Darklist /> : <Whitelist />}</ListLayer>
      <GridLayer onClick={ChangeHandler}>{change ? <Whitegrid /> : <Darkgrid />}</GridLayer>
    </ButtonLayer>
  );
};

export default SwitchLayer;
const ButtonLayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-left: auto;
`;

const ListLayer = styled.div``;
const GridLayer = styled.div``;
