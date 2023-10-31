import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import NotFound from '../component/NotFound';
import Photo from '../pages/Photo/Photo';
import Video from '../pages/Video/Video';
import Gallery from '../pages/Gallery/Gallery';
import Realtime from '../pages/Realtime/Realtime';
import Signup from '../pages/Signup/Signup';
import Signin from '../pages/Signin/Signin';
import MyPage from '../pages/Mypage/MyPage';
import TokenRedirect from '../component/TokenRedirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <TokenRedirect />,
        children: [
          {
            path: '',
            element: <Photo />,
          },
          {
            path: 'photo',
            element: <Photo />,
          },
          {
            path: 'video',
            element: <Video />,
          },
          {
            path: 'gallery',
            element: <Gallery />,
          },
          {
            path: 'realtime',
            element: <Realtime />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
          {
            path: 'signin',
            element: <Signin />,
          },
          {
            path: 'mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
