import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Banner from '../components/Banner';

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          'https://lereacteur-vinted-api.herokuapp.com/offers'
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <>
      <Banner />
      <div className='container-market'>
        {data.offers.map((offer, index) => {
          return (
            <div key={index}>
              <Link to={`/offer/${offer._id}`}>
                <div className='container-card'>
                  {offer.owner && offer.owner.account.avatar && (
                    <img
                      style={{ width: '50px' }}
                      src={offer.owner.account.avatar.secure_url}
                      alt='avatar_profil'
                    />
                  )}

                  <h2 className='container-title-card'>
                    {offer.owner && offer.owner.account.username}
                  </h2>
                  <img
                    className='container-image-card'
                    style={{
                      height: '360px',
                      width: '235px',
                      objectFit: 'cover'
                    }}
                    src={offer.product_image.secure_url}
                    alt='picture_produit'
                  />
                  <span>{offer.product_price}</span>
                  {offer.product_details.map((element, index) => {
                    return (
                      <div key={index}>
                        <span>{element.TAILLE}</span>
                        <span>{element.MARQUE}</span>
                      </div>
                    );
                  })}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
