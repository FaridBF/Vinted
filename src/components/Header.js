import logo_vinted from '../assets/logo_vinted.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ token, setUser, input, setInput }) => {
  const navigate = useNavigate();

  return (
    <div className='header-container'>
      <div className='header-position'>
        <Link to='/'>
          <img className='header-logo' src={logo_vinted} alt='logo_vinted' />
        </Link>

        <div className='search-container'>
          <div>
            <input
              type='text'
              className='search-input'
              value={input}
              placeholder='Recherche des articles'
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </div>
          <div className='container-sort'>
            <div className='section-sort'>
              <span>trier par prix :</span>
              <span>...</span>
              <span>Prix entre :</span>
            </div>
          </div>
        </div>
        <div className='button-container'>
          {token === null ? (
            <>
              <Link to='/signup'>
                <button className='header-button'>S'inscrire</button>
              </Link>
              <br />
              <Link to='/login'>
                <button className='header-button'>Se connecter</button>
              </Link>
            </>
          ) : (
            <button
              className='header-button'
              onClick={() => {
                setUser(null);
                navigate('/');
              }}
            >
              Se déconnecter
            </button>
          )}
        </div>
        <div>
          <Link to='/login'>
            <button className='button-sold'>Vends tes articles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
