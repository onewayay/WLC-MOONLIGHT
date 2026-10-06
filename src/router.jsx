import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/home/Home';
import WlcList from '@/pages/wlclist/WlcList';
import WlcView from '@/pages/wlcview/WlcView';
import AnnotationCollect from '@/pages/annotation/AnnotationCollect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'wlc',
        children: [
          { index: true, element: <WlcList /> },
          { path: ':qaNum', element: <WlcView /> },
        ],
      },
      { path: 'annotationcollect', element: <AnnotationCollect /> },
    ],
  },
]);

export default router;
