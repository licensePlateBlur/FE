import Resizer from 'react-image-file-resizer';
const ResizeImage = async(file : File, maxWidth:number, maxHeight:number):Promise<File> =>
    new Promise((resolve) => {

      console.log(file.type);
      Resizer.imageFileResizer(file, maxWidth, maxHeight, 'JPEG', 100, 0, (resizedImage) => {
      resolve(resizedImage as File);
    },"file");
  });
export default ResizeImage