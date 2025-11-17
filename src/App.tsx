import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/routes';

/**
 * 루트 App 컴포넌트
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;

