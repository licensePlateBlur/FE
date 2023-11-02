import { VideoData } from '../../../interface/VideoData';
function VideoCounter(props: VideoData[]) {
  const label: number[] = [0, 0, 0, 0];
  // eslint-disable-next-line array-callback-return
  props.map((data: VideoData) => {
    const deepcopy = JSON.parse(JSON.stringify(data)) as VideoData; //깊은복사
    const Classes = deepcopy.class.split('/');
    // eslint-disable-next-line array-callback-return
    Classes.map((Class: string) => {
      if (Class === 'face') {
        label[0] += 1;
      } else if (Class === 'license-plate') {
        label[1] += 1;
      } else if (Class === 'Mobile phone') {
        label[2] += 1;
      } else if (Class === 'card') {
        label[3] += 1;
      }
    });
  });
  return label;
}
export default VideoCounter;
