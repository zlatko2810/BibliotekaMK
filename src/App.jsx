import { useState } from 'react';
import './App.css';

import Login from './components/login-register/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { UserInfoContext } from './contexts/UserInfoContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<LandingPage />} />
            <Route path='/home/*' element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </UserInfoContext.Provider >
  );
}

export default App;
