import { useState } from 'react';
import Cookies from 'js-cookie';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Offer from './pages/Offer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Publish from './pages/Publish';
import Payment from './pages/Payment';

function App() {
  const [token, setToken] = useState(Cookies.get('userToken') || null);
  const [input, setInput] = useState('');
  const [isPriceAsc, setIsPriceAsc] = useState(true);

  console.log('token dans app =>', token);

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      //Action de connexion
      console.log("Création d'un cookie userToken");
      Cookies.set('userToken', tokenToCheck, { expires: 7 });
    } else {
      //action de déconnexion
      console.log("Suppression d'un cookie userToken");
      Cookies.remove('userToken');
    }
    setToken(tokenToCheck);
  };

  return (
    <div className='container'>
      <Router>
        <Header
          token={token}
          setUser={setUser}
          input={input}
          setInput={setInput}
          isPriceAsc={isPriceAsc}
          setIsPriceAsc={setIsPriceAsc}
        />
        <Routes>
          <Route
            path='/'
            element={<Home isPriceAsc={isPriceAsc} input={input} />}
          />
          <Route path='/offer/:offerId' element={<Offer />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<Signup setUser={setUser} />} />
          <Route path='/publish' element={<Publish token={token} />} />
          <Route path='/payment' element={<Payment token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
