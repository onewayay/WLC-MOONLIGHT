import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import AnnotationCollect from './pages/AnnotationCollect';
import NotFound from './pages/NotFound';
import WlcList from './pages/WlcList';
import WlcView from './pages/WlcView';

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
