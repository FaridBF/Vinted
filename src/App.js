import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Home from './pages/Home';
import Offer from './pages/Offer';

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      'https://lereacteur-vinted-api.herokuapp.com/offers'
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/offer'>Offer</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Offer' element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
