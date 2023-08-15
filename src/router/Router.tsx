import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Photo from "../pages/Photo";
import Main from "../pages/Main";


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
            }
        ],
        errorElement : <NotFound/>
    }


])

export default router