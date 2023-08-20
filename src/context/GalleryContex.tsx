import React,{useEffect, useState,ReactNode,createContext, useCallback, useContext} from 'react'
import { GalleryData } from '../interface/GalleryData';
import { getfiles } from '../apis/gallery';

interface GalleryChangeContextType{
    addPage: () => void
}
const GalleryContex = createContext<GalleryData[] | null>(null); 
const GalleryChangeContext = createContext<GalleryChangeContextType | null>(null)

export const useGallery = () => useContext(GalleryContex)
export const useGalleryChange = () => useContext(GalleryChangeContext)

export const GalleryContexFC = ({children}:{children : ReactNode})=>{

    const [datas,setDatas]=useState<GalleryData[]>([])
    const [page,setPage]=useState(1)
    const addPage = () => setPage( (prev) => prev+1)
    const GetFiles = useCallback (async() =>{
        try{
            const response = await getfiles(page)
            setDatas( (prev)=> [...prev,...response.data])
        }catch(err)
        {
            console.log(err)
        }
    },[page])
    useEffect( ()=>{
        GetFiles()
    },[GetFiles])
    return(
        <GalleryContex.Provider value={datas}>
            <GalleryChangeContext.Provider value={{addPage}}>
                {children}
            </GalleryChangeContext.Provider>
        </GalleryContex.Provider>
    )
}