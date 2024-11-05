import './App.css';
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RoomLayout from './layouts/RoomLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <div className="App">
      <Router>
        <Routes>
          {
            !token ? 
            <Route path = '/auth' element = {<AuthLayout />} />
            :
            <Route path = '/auth/*' element = {<Navigate to = '/editor' ></Navigate>} />
          }

          <Route path="/editor" element={
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          } />

          <Route path="/room/:roomId" element={
            <PrivateRoute>
              <RoomLayout />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
