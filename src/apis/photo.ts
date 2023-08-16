import { api } from "./core"

export const upload = async(formdata: FormData)=>{
    const response = await api.post("detect_image",formdata)
    return response
}
