import { api } from "./core"

export const getfiles = async()=>{
    const response = await api.get("files")
    return response
}

export const downloadfile =async (id : number) => {
    const response = await api.get(`download_file/${id}`)
    return response
}