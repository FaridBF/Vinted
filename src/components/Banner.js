import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='container-banner'>
      <div className='banner-buy'>
        <div>
          <p>Prêts à faire du tri dans vos placards?</p>

          <Link to='/login'>
            <button className='button-banner'>Commencer à vendre</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
