import React, {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { GalleryData } from '../interface/GalleryData';
import { getfiles } from '../apis/gallery';

interface GalleryChangeContextType {
  addPage: () => void;
}
interface GalleryValue{
  datas : GalleryData[],
  endpoint : boolean
}
const GalleryContex = createContext<GalleryValue | null>(null);
const GalleryChangeContext = createContext<GalleryChangeContextType | null>(null);

export const useGallery = () => useContext(GalleryContex);
export const useGalleryChange = () => useContext(GalleryChangeContext);

export const GalleryContexFC = ({ children }: { children: ReactNode }) => {
  const [datas, setDatas] = useState<GalleryData[]>([]);
  const [page, setPage] = useState(1);
  const [endpoint,setEndpoint]=useState<boolean>(false);
  const addPage = () => setPage(prev => prev + 1);
  const GetFiles = useCallback(async () => {
    const response = await getfiles(page);
    if(response.data.length === 0) setEndpoint(true)
    else{
      setDatas(prev => [...prev, ...response.data]);
      setEndpoint(false)
    }
  }, [page]);
  useEffect(() => {
    GetFiles();
  }, [GetFiles]);
  return (
    <GalleryContex.Provider value={{datas,endpoint}}>
      <GalleryChangeContext.Provider value={{ addPage }}>{children}</GalleryChangeContext.Provider>
    </GalleryContex.Provider>
  );
};
