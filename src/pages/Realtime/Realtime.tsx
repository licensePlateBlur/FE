import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import VideoCounter from './hook/VideoCounter';
import FindXY from './hook/FindXY';
import FindClass from '../../hook/FindClass';
import { ReactComponent as DragImage } from '../../svg/realtimeicon.svg';
import { ReactComponent as Icon } from '../../svg/icon.svg';
import { previewvideo } from '../../apis/realtime';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getid } from '../../store/video';
import DownButton from '../../component/Button';
import { VideoData } from '../../interface/VideoData';
import { realtimeshooting } from '../../apis/realtime';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorageToken } from '../../utils/LocalStorage';
import { CheckModel, modelOptions } from '../../utils/CheckModel';
function Realtime() {
  const [datas, setDatas] = useState<VideoData[]>([]);
  const [label, setLabel] = useState<number[]>([0, 0, 0, 0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [model, setModel] = useState<string>('얼굴');
  const id = useSelector((store: RootState) => store.video.id);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //ref
  const inputRef = useRef<HTMLLabelElement>(null);

  function HandleCancel() {
    window.location.reload();
  }
  const HandleModel = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setModel(e.target.value);
  };
  const PreviewHandler = async () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    const source = document.getElementById('source') as HTMLVideoElement;
    try {
      const res = await previewvideo(id);
      console.log(res);
      const videourl = URL.createObjectURL(res.data);
      source.src = videourl;
      video.load();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const input = inputRef.current;

    const RealtimePlay = async () => {
      if (!getLocalStorageToken()) {
        alert('로그인 권한이 없습니다');
        navigate('/signin', { state: { from: location } });
      }
      setShow(false);
      setLoading(true);
      setDrop(true);
      const preload = document.querySelectorAll<HTMLElement>('.preload');
      preload.forEach(preload => (preload.style.display = 'none'));
      try {
        const formData = new FormData();
        const modelNumber = CheckModel(model);
        formData.append('model', modelNumber);
        const response = await realtimeshooting(formData);
        setDatas(response.data[3]);
        dispatch(getid(response.data[0].video_id));
        const copylabel = VideoCounter(response.data[3]);
        setLabel(copylabel);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setShow(true);
        setTimeout(() => {
          setDrop(false);
        }, 1800);
      }
    };
    //리스너생성
    if (input) {
      input.addEventListener('click', RealtimePlay);
    }
    return () => {
      //리스너삭제
      if (input) {
        input.removeEventListener('click', RealtimePlay);
      }
    };
  }, [dispatch, id, location, navigate,model]);
  return (
    <Layer>
      {drop ? (
        loading ? (
          <DownButton message="촬영중" />
        ) : (
          <DownButton message="촬영완료" isfadeout={true} />
        )
      ) : null}
      <UploadBox>
        <TitleLayer>
          <BoldText1>클릭시 촬영을 시작합니다.</BoldText1>
          <ModelLayer>
            <ModelLabel>모델 : </ModelLabel>
            <ModelSelect value={model} onChange={HandleModel}>
              {modelOptions.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </ModelSelect>
          </ModelLayer>
        </TitleLayer>
        <form>
          <Label ref={inputRef} htmlFor="input-file-upload">
            <DragImage />
          </Label>
        </form>
      </UploadBox>
      <DisabledBox>
        <ButtonLayer>
          <BoldText>블러처리된 영상 보기</BoldText>
          {!loading && id !== 0 && (
            <>
              <CancelBtn onClick={HandleCancel}>취소</CancelBtn>
              <DownloadBtn onClick={PreviewHandler}>
                <Icon />
                영상보기
              </DownloadBtn>
            </>
          )}
        </ButtonLayer>
        {!loading ? (
          <VideoBox controls id="video" $isflex={show}>
            <source id="source" src=""></source>
          </VideoBox>
        ) : null}
        <DisabledRectangle className="preload">촬영을 시작해주세요</DisabledRectangle>
        {loading && <DisabledRectangle>촬영중 입니다. 기다려주세요</DisabledRectangle>}
      </DisabledBox>
      <DisabledInfoBox>
        <BoldText1>탐색된 좌표</BoldText1>
        <DisabledInfoRectangle className="preload">촬영을 시작해주세요</DisabledInfoRectangle>
        {loading && <DisabledInfoRectangle>촬영중 입니다. 기다려주세요</DisabledInfoRectangle>}
        {!loading && id !== 0 && <FindXY data={datas} />}
      </DisabledInfoBox>
      <DisabledInfoBox>
        <BoldText1>탐색된 클래스</BoldText1>
        <DisabledInfoRectangle className="preload">촬영을 시작해주세요</DisabledInfoRectangle>
        {loading && <DisabledInfoRectangle>촬영중 입니다. 기다려주세요</DisabledInfoRectangle>}
        {!loading && id !== 0 && <FindClass label={label} />}
      </DisabledInfoBox>
    </Layer>
  );
}
export default Realtime;

const Layer = styled.div`
  width: 80%;
  margin: 0 197px;
  display: flex;
  flex-wrap: wrap;
  gap: 27px;
  position: relative;
`;
const VideoBox = styled.video<{ $isflex: boolean }>`
  display: ${props => (props.$isflex ? 'flex' : 'none')};
  width: 752px;
  height: 398px;
  max-width: 752px;
  max-height: 398px;
`;

const UploadBox = styled.div`
  width: 752px;
  height: 465px;
  margin-top: 111px;
`;
const BoldText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
`;
const BoldText1 = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
  margin-bottom: 31px;
`;
const Label = styled.label`
  width: 100%;
  height: 398px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
  }
`;
const DisabledBox = styled.div`
  margin-top: 111px;
  width: 752px;
  height: 465px;
`;
const DisabledRectangle = styled.div`
  width: 100%;
  height: 398px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #f9f9f9;
  color: #808080;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 32.4px */
  letter-spacing: -0.24px;
`;
const CancelBtn = styled.button`
  width: 96px;
  height: 40px;
  border-radius: 35px;
  background: #f3f3f3;
  color: #606060;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  border: none;
`;
const ButtonLayer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 31px;
`;
const DisabledInfoBox = styled.div`
  margin-top: 111px;
  width: 752px;
  height: 310px;
`;
const DisabledInfoRectangle = styled.div`
  width: 100%;
  height: 245px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #f9f9f9;
  color: #808080;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 32.4px */
  letter-spacing: -0.24px;
`;
const DownloadBtn = styled.button`
  width: 158px;
  height: 40px;
  border-radius: 35px;
  background: #000;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0px;
`;
const TitleLayer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModelLabel = styled.label`
font-size: 21px;
background: #f3f3f3;
border-radius: 15px;
padding : 10px;
border : none;
`;

const ModelLayer = styled.div`
  display : flex;
  gap : 5px;
  color: #000;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
  margin-left: auto;
`;

const ModelSelect = styled.select`
  color: #000;
  font-family: Pretendard;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.32px;
  background: #fffbef;
  border-radius: 15px;
  border: 1px dashed #fedd33;
  padding: 10px;
`;
