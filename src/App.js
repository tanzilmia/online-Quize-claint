import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routing/router'
import './cssFiles/DashDiv.css'
function App() {
  return (
    <div className="main_page">
      <RouterProvider router={router}>
    </RouterProvider>
    <Toaster
  position="top-right"
  reverseOrder={true}
/>
    </div>
  );
}

export default App;
