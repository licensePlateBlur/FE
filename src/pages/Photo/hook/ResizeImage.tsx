import Resizer from 'react-image-file-resizer';
const ResizeImage = async (file: File, maxWidth: number, maxHeight: number): Promise<File> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지파일이 아닙니다.'));
      return;
    }
    console.log(file.type);
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'jpeg',
      100,
      0,
      resizedImage => {
        resolve(resizedImage as File);
      },
      'file',
    );
  });
export default ResizeImage;
