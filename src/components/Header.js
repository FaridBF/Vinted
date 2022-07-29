import logo_vinted from '../assets/logo_vinted.png';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-position'>
        <img className='header-logo' src={logo_vinted} alt='logo_vinted' />
        <div className='search-container'>
          <div>
            <input
              type='text'
              className='search-input'
              placeholder='Recherche des articles'
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
        <div>
          <button className='header-button'>S'inscrire</button>
          <button className='header-button'>Se connecter</button>
        </div>
        <div>
          <button className='button-sold'>Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
