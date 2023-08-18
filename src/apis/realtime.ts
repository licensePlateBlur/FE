import { api } from "./core"

export const realtimeshooting = async()=>{
    const response = await api.post("detect_realtime")
    return response
}

export const previewvideo = async(id : number)=>{
    const response = await api.get(`video/${id}`,{ responseType: 'blob' })
    return response
}