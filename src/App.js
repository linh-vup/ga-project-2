import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './components/auth/Account';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Song from './components/Song';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:birthyear" element={<Song />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>Oops, page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
