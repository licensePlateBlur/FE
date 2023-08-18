interface VideoData{
  class : string
  time : string
}

function VideoCounter(props : VideoData[])
{
    const label =[0,0,0,0]
    // eslint-disable-next-line array-callback-return
    props.map( (data : VideoData) =>
          {
            const deepcopy=JSON.parse(JSON.stringify(data)) as VideoData //깊은복사
            const Classes = deepcopy.class.split('/');
            // eslint-disable-next-line array-callback-return
            Classes.map( (Class : string) =>{
              if(Class  === '0')
              {
                label[0] += 1;
              }
              else if (Class  === "Mobile phone")
              {
                label[1] += 1;
              }
              else if (Class  === "card")
              {
                label[2] += 1;
              }
              else if(Class ==="license-plate")
              {
                label[3] += 1;
              }})
          })
    return label
}
export default VideoCounter