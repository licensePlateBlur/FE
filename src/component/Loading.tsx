import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { removeLocalStorageToken } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useGalleryChange } from "../context/GalleryContex";
const Loading = ( props : {isError : unknown} )=> 
{
  const { noError }: any = useGalleryChange();
  const navigate = useNavigate();
  const [err,setErr]=useState<string>('');
  useEffect( ()=>{
    if(axios.isAxiosError(props.isError))
    {
      if (props.isError.response?.status === 401) {
        setErr(props.isError.message)
        toast.warn('토큰이 만료되었습니다. 다시 로그인 해주세요', {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            removeLocalStorageToken();
            navigate('/signin');
            noError(false);
          },
        });
      } else if (props.isError.code === 'ERR_NETWORK') {
        setErr(props.isError.message)
        toast.warn('502 Bad GateWay !', {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            noError(false);
          }
        });
      } else {
        console.log(props.isError);
        setErr(props.isError.message)
        toast.error('알수없는 에러 발생!', {
          position: toast.POSITION.TOP_CENTER,
          onClose: () => {
            noError(false);
          }
        });
      }
    }
  },[navigate,props.isError,noError])
  return (<h1>{err}</h1>);
};

export default Loading;
