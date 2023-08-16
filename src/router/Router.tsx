import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Photo from "../pages/Photo/Photo";
import Main from "../pages/Main";
import Video from "../pages/Video/Video";
import PhotoGallery from "../pages/PhotoGallery/PhotoGallery";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children :[
            {
                path : "",
                element : <Main/>,
            },
            {
                path : "photo",
                element : <Photo/>
            },
            {
                path : "video",
                element : <Video/>
            },
            {
                path : "photogallery",
                element : <PhotoGallery/>
            },
        ],
        errorElement : <NotFound/>
    }


])

export default router