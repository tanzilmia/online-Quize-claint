
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routing/router'
import './cssFiles/DashDiv.css'
function App() {
  return (
    <div className="main_page">
      <RouterProvider router={router}>
    </RouterProvider>
    </div>
  );
}

export default App;
