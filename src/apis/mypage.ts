import { Authapi } from "./core"

export const getuser = async() =>{
    const response = await Authapi.get('mypage');
    return response;
}