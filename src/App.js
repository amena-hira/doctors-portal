import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes/Routes';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <RouterProvider router={ routes }></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
