import { VideoData } from '../../../interface/VideoData';
function VideoCounter(props: VideoData[]) {
  const label: number[] = [0, 0, 0, 0];

  props.forEach((data: VideoData) => {
    const deepcopy = JSON.parse(JSON.stringify(data)) as VideoData; //깊은복사
    const Classes = deepcopy.class.split('/');
    Classes.forEach((Class: string) => {
      if (Class === '0') {
        label[0] += 1;
      } else if (Class === 'Mobile phone') {
        label[1] += 1;
      } else if (Class === 'card') {
        label[2] += 1;
      } else if (Class === 'license-plate') {
        label[3] += 1;
      }
    });
  });
  return label;
}
export default VideoCounter;
