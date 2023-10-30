import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as DragImage } from '../../svg/upload-box-group.svg';
import { ReactComponent as Icon } from '../../svg/icon.svg';
import { canvassave, photoupload } from '../../apis/photo';
import PhotoCounter from './hook/PhotoCounter';
import ResizeImage from './hook/ResizeImage';
import FindXY from './hook/FindXY';
import FindClass from '../../hook/FindClass';
import DownButton from '../../component/Button';
import TransferCanvastoJpg from './hook/TransferCanvastoJpg';
import { useDispatch, useSelector } from 'react-redux';
import { getfilename } from '../../store/photo';
import { RootState } from '../../store/store';
import { PhotoData } from '../../interface/PhotoData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageToken } from '../../utils/LocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
function Photo() {
  const [checkm, setCheckm] = useState([true, true, true]);
  const [datas, setDatas] = useState<PhotoData[]>([]);
  const [label, setLabel] = useState<number[]>([0, 0, 0, 0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);
  const [datashow, setDataShow] = useState<boolean>(false);
  const file = useSelector((store: RootState) => store.file.filename);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLLabelElement>(null);
  const changeRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<any>(null); //canvashtml로 정의
  const blurRef = useRef<any>(null);
  const hoverRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  function HandleCancel() {
    window.location.reload();
  }
  const SaveHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setClick(true);
    setDownloading(true);
    event.preventDefault();
    console.log('click');
    const blur = document.getElementById('blur') as HTMLCanvasElement;
    if (blur) {
      try {
        await canvassave(TransferCanvastoJpg(blur, file));
      } catch (error) {
        console.log(error);
      } finally {
        setDownloading(false);
        setTimeout(() => {
          setClick(false);
        }, 1999);
      }
    }
  };
  useEffect(() => {
    const input = inputRef.current; //어떤 객체가 만들어진다고 했는데 이게 이벤트 리스너랑 같은 역활을 한다.
    const canvas = canvasRef.current;
    const blur = blurRef.current;
    const hover = hoverRef.current;
    const changeinput = changeRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const blurctx = blur.getContext('2d', { willReadFrequently: true });
    const hoverctx = hover.getContext('2d', { willReadFrequently: true });
    //changeHandler
    function InputOnchange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        if (target.files.length > 0) {
          console.log(target.files[0]);
          DrawImage(target.files[0]);
        }
      }
    }
    // Handle dragover event
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
      if (input) input.style.transform = 'scale(1.03)';
    }
    function handleDragLeave(event: DragEvent) {
      event.preventDefault();
      if (input) input.style.transform = 'scale(1.0)';
    }
    function handleDrop(event: DragEvent) {
      if (input) input.style.transform = 'scale(1.0)';
      event.preventDefault();
      if (event.dataTransfer) {
        console.log(event.dataTransfer.files[0]);
        const f = event.dataTransfer.files[0];
        if (getLocalStorageToken()) {
          DrawImage(f);
        } else {
          alert('로그인 권한이 없습니다');
          navigate('/signin', { state: { from: location } });
        }
      }
    }
    const DrawImage = async (f: File) => {
      if (context !== null) {
        canvas.style.display = 'none';
        blur.style.display = 'none';
        hover.style.display = 'none';
      }
      try {
        const resizedImage = await ResizeImage(f, 752, 398);
        console.log(resizedImage);
        const preload = document.querySelectorAll<HTMLElement>('.preload');
        preload.forEach(preload => (preload.style.display = 'none'));
        const formData = new FormData();
        formData.append('image', resizedImage);
        try {
          setDrop(true);
          setLoading(prev => !prev);
          const response = await photoupload(formData);
          setDatas(response.data);
          setDataShow(true);
          console.log(response);
          dispatch(getfilename(resizedImage.name));
          const copylabel = PhotoCounter(response.data);
          setLabel(copylabel);
          setLoading(prev => !prev);
          canvas.style.display = 'flex';
          blur.style.display = 'flex';
          hover.style.display = 'flex';
        } catch (err) {
          console.log(err);
        }
        ////////////////////////////////////////좌표값을 받아오고 진행
        const img = new Image();
        img.src = URL.createObjectURL(resizedImage);
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          blur.width = img.naturalWidth;
          blur.height = img.naturalHeight;
          hover.width = img.naturalWidth;
          hover.height = img.naturalHeight;

          //이미지가 로딩되면 한번 초기화 시키고
          context.clearRect(0, 0, canvas.width, canvas.height);
          //이미지를 로딩
          context.drawImage(img, 0, 0, canvas.width, canvas.height); //원본
          blurctx.drawImage(img, 0, 0, canvas.width, canvas.height); //블라인드도 원본으로 초기화
        };
      } catch (err) {
        if (err instanceof Error)
          toast.warn(err.message, {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => window.location.reload(),
          });
      }

      setTimeout(() => {
        setDrop(false);
      }, 1800);
    };
    function SetBlindCheck(i: number) {
      const copy = [...checkm];
      copy[i] = !copy[i];
      setCheckm(copy);
    }
    function BlurOn(x1: number, y1: number, width1: number, height1: number) {
      console.log('on');
      let imageData = context.getImageData(x1, y1, width1, height1); //원하는 좌표가 될것
      console.log(imageData.data);

      const pixels = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      for (let y = 0; y < height; y += 15) {
        for (let x = 0; x < width; x += 15) {
          let r = 0,
            g = 0,
            b = 0;
          let count = 0;

          // Sum the RGB values of each pixel in the tile
          for (let dy = 0; dy < 15 && y + dy < height; dy++) {
            for (let dx = 0; dx < 15 && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              r += pixels[index];
              g += pixels[index + 1];
              b += pixels[index + 2];
              count++;
            }
          }

          // Calculate the average RGB value for the tile
          const avgR = Math.floor(r / count);
          const avgG = Math.floor(g / count);
          const avgB = Math.floor(b / count);

          // Set the RGB values of each pixel in the tile to the average value
          for (let dy = 0; dy < 15 && y + dy < height; dy++) {
            for (let dx = 0; dx < 15 && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              pixels[index] = avgR;
              pixels[index + 1] = avgG;
              pixels[index + 2] = avgB;
            }
          }
        }
      }
      blurctx.putImageData(imageData, x1, y1);
    }
    function BlurOff(x: number, y: number, width: number, height: number) {
      console.log('off');
      let imageData = context.getImageData(x, y, width, height); //원하는 좌표가 될것
      console.log(imageData);
      blurctx.putImageData(imageData, x, y); //블라인드를 매꾼다.
    }
    function ClickHandler(event: MouseEvent) {
      event.preventDefault();
      const x = event.offsetX;
      const y = event.offsetY;

      // eslint-disable-next-line array-callback-return
      datas.map((data: any, i) => {
        if (x >= data.xmin && x <= data.xmax && y >= data.ymin && y <= data.ymax) {
          // console.log(i);
          if (checkm[i]) {
            //true는 블라인드를 할수 있다.
            BlurOn(data.xmin, data.ymin, data.xmax - data.xmin, data.ymax - data.ymin);
            SetBlindCheck(i);
          } else {
            //false는 블라인드를해제할수 있다.
            BlurOff(data.xmin, data.ymin, data.xmax - data.xmin, data.ymax - data.ymin);
            SetBlindCheck(i);
          }
        }
      });
      console.log(checkm);
    }
    function MouseMoveHandler(event: MouseEvent) {
      event.preventDefault();
      const x = event.offsetX;
      const y = event.offsetY;
      datas.forEach((data: any) => {
        if (x >= data.xmin && x <= data.xmax && y >= data.ymin && y <= data.ymax) {
          hoverctx.strokeStyle = 'red';
          hoverctx.strokeRect(
            data.xmin,
            data.ymin,
            Math.floor(data.xmax) - Math.floor(data.xmin),
            Math.floor(data.ymax) - Math.floor(data.ymin),
          );
        } else if (x >= 0 && x <= hover.width && y >= 0 && y <= hover.height) {
          hoverctx.strokeStyle = 'blue';
          hoverctx.strokeRect(
            data.xmin,
            data.ymin,
            Math.floor(data.xmax) - Math.floor(data.xmin),
            Math.floor(data.ymax) - Math.floor(data.ymin),
          );
        } else {
          hoverctx.clearRect(0, 0, hover.width, hover.height);
        }
      });
    }
    function MouseOutHandler(event: MouseEvent) {
      event.preventDefault();
      hoverctx.clearRect(0, 0, hover.width, hover.height);
    }

    //리스너생성
    if (input) input.addEventListener('dragover', handleDragOver); //이게 있어야 drop 이 작동됨
    if (input) input.addEventListener('dragleave', handleDragLeave);
    if (input) input.addEventListener('drop', handleDrop);
    if (changeinput) changeinput.addEventListener('change', InputOnchange);
    hover.addEventListener('click', ClickHandler);
    hover.addEventListener('mousemove', MouseMoveHandler);
    hover.addEventListener('mouseout', MouseOutHandler);
    return () => {
      //리스너삭제
      if (input) input.removeEventListener('dragover', handleDragOver);
      if (input) input.addEventListener('dragleave', handleDragLeave);
      if (input) input.removeEventListener('drop', handleDrop);
      if (changeinput) changeinput.removeEventListener('change', InputOnchange);
      hover.removeEventListener('click', ClickHandler);
      hover.removeEventListener('mousemove', MouseMoveHandler);
      hover.removeEventListener('mouseout', MouseOutHandler);
    };
  }, [datas, label, checkm, dispatch, location, navigate]);
  return (
    <Layer>
      {drop ? (
        loading ? (
          <DownButton message="로딩중" />
        ) : (
          <DownButton message="로딩완료" isfadeout={true} />
        )
      ) : null}
      {click ? (
        downloading ? (
          <DownButton message="다운중" />
        ) : (
          <DownButton message="다운완료" isfadeout={true} />
        )
      ) : null}
      <UploadBox>
        <BoldText1>사진을 업로드 해주세요</BoldText1>
        <form>
          <Input ref={changeRef} type="file" id="input-file-upload" multiple={false} />
          <Label ref={inputRef} htmlFor="input-file-upload">
            <DragImage />
          </Label>
        </form>
      </UploadBox>
      <DisabledBox>
        <ButtonLayer>
          <BoldText>클릭해서 블러처리를 on/off 하세요</BoldText>
          {!loading && datashow && (
            <>
              <CancelBtn onClick={HandleCancel}>취소</CancelBtn>
              <DownloadBtn onClick={SaveHandler}>
                <Icon />
                저장하기
              </DownloadBtn>
            </>
          )}
        </ButtonLayer>
        <canvas id="canvas" ref={canvasRef} />
        <canvas id="blur" ref={blurRef} />
        <canvas id="hover" ref={hoverRef} />
        <DisabledRectangle className="preload">사진을 먼저 업로드해주세요.</DisabledRectangle>
        {loading && <DisabledRectangle>로딩중 입니다. 기다려주세요</DisabledRectangle>}
      </DisabledBox>
      <DisabledInfoBox>
        <BoldText1>탐색된 좌표</BoldText1>
        <DisabledInfoRectangle className="preload">
          사진을 먼저 업로드해주세요.
        </DisabledInfoRectangle>
        {loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
        {!loading && datashow && <FindXY datas={datas} />}
      </DisabledInfoBox>
      <DisabledInfoBox>
        <BoldText1>탐색된 클래스</BoldText1>
        <DisabledInfoRectangle className="preload">
          사진을 먼저 업로드해주세요.
        </DisabledInfoRectangle>
        {loading && <DisabledInfoRectangle>로딩중 입니다. 기다려주세요</DisabledInfoRectangle>}
        {!loading && datashow && <FindClass label={label} />}
      </DisabledInfoBox>
    </Layer>
  );
}

export default Photo;

const Layer = styled.div`
  width: 80%;
  margin: 0 197px;
  display: flex;
  flex-wrap: wrap;
  gap: 27px;
  position: relative;
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
const Input = styled.input`
  display: none;
`;
const Label = styled.label`
  width: 100%;
  height: 398px;
  display: flex;
  align-items: center;
  justify-content: center;
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
