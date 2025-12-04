import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Wlc from './pages/Wlc';
import AnnotationCollect from './pages/AnnotationCollect';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'wlc', element: <Wlc /> },
      { path: 'annotationcollect', element: <AnnotationCollect /> },
    ],
  },
]);

export default router;
