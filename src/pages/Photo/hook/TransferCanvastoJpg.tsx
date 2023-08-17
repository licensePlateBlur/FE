function TransferCanvastoJpg(blur : HTMLCanvasElement)
{
      const image = blur.toDataURL("image/jpeg", 1.0)
      var link = document.createElement('a');
      link.download = "test.jpg";
      link.href = image;
      link.click();

      var blobBin = atob(image.split(',')[1]);	// base64 데이터 디코딩
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
      var mozaicfile = new File([blob], "test.jpg" ,{ type: 'image/jpeg' });
      var formdata = new FormData();	// formData 생성
      formdata.append("file", mozaicfile);	// file data 추가
      return formdata
}
export default TransferCanvastoJpg