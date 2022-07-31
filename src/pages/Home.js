import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Banner from '../components/Banner';

const Home = ({ input, isPriceAsc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataWithInput = async (input) => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offers?title=${input}`
    );
    setData(response.data);
    setIsLoading(false);
  };

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

  useEffect(() => {
    if (input.length > 0) {
      try {
        fetchDataWithInput(input);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [input]);

  useEffect(() => {
    try {
      setIsLoading(true);
      const sortByPrice = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${
            isPriceAsc ? 'price-asc' : 'price-desc'
          }`
        );
        const dataTemp = response.data;
        setData(dataTemp);
        setIsLoading(false);
        console.log(response.data);
      };
      sortByPrice();
    } catch (error) {
      console.log(error.message);
    }
  }, [isPriceAsc]);

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
                  <div className='container-title-avatar'>
                    {offer.owner && offer.owner.account.avatar && (
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        alt='avatar_profil'
                      />
                    )}

                    <h2 className='container-title-card'>
                      {offer.owner && offer.owner.account.username}
                    </h2>
                  </div>
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
                  <div className='card-price-size-brand'>
                    <span className='price'>{offer.product_price} €</span>
                    {offer.product_details.map((element, index) => {
                      return (
                        <div key={index}>
                          <span className='sizes'>{element.TAILLE}</span>
                          <span className='brand'>{element.MARQUE}</span>
                        </div>
                      );
                    })}
                  </div>
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
