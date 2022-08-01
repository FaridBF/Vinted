import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../publish.css';

function Publish({ token }) {
  const navigate = useNavigate();

  const [isPictureSending, setIsPictureSending] = useState(false);
  const [data, setData] = useState(null);

  const [title, setTitle] = useState('voiture');
  const [description, setDescription] = useState('jolie modèle');
  const [price, setPrice] = useState('5');
  const [condition, setCondition] = useState('neuf');
  const [city, setCity] = useState('gotham city');
  const [brand, setBrand] = useState('lvmh');
  const [size, setSize] = useState('grande taille');
  const [color, setColor] = useState('noir');
  const [picture, setPicture] = useState('');

  const handleSendObject = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);

    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('city', city);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('color', color);

    const response = await axios.post(
      'https://lereacteur-vinted-api.herokuapp.com/offer/publish',
      formData,
      {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log(response.data);
    setData(response.data);
    setIsPictureSending(false);
    navigate('/offer/:offerId');
  };
  return (
    <div className='publish-main'>
      <div className='publish-container'>
        <h2>Vends ton article</h2>
        <form onSubmit={handleSendObject}>
          <div className='file-select'>
            <div className='dashed-preview-without'>
              <div className='input-design-default'>
                <div className='label-file'>
                  <input
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setPicture(event.target.files[0]);
                    }}
                    type='file'
                  />
                  <input type='submit' value='Ajoute une photo' />
                  {isPictureSending === true ? (
                    <h1>Image en cours d'uplaod</h1>
                  ) : (
                    data && (
                      <img
                        src={data.picture}
                        style={{ width: '200px' }}
                        alt='picture_posted'
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Titre</h4>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='ex: Chemise Sézane verte'
                onChange={(event) => {
                  console.log(event.target.value);
                  setTitle(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input'>
              <h4>Décris ton article</h4>
              <input
                name='description'
                id='description'
                rows='5'
                placeholder='ex: porté quelquefois, taille correctement'
                onChange={(event) => {
                  console.log(event.target.value);
                  setDescription(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className='text-input-section'>
            <div className='text-input'>
              <h4>Marque</h4>
              <input
                type='text'
                id='brand'
                name='brand'
                placeholder='ex: Zara'
                onChange={(event) => {
                  console.log(event.target.value);
                  setBrand(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input'>
              <h4>Taille</h4>
              <input
                type='text'
                id='size'
                name='size'
                placeholder='ex: L / 40 / 12'
                onChange={(event) => {
                  console.log(event.target.value);
                  setSize(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input'>
              <h4>Couleur</h4>
              <input
                type='text'
                id='color'
                name='color'
                placeholder='ex: Fushia'
                onChange={(event) => {
                  console.log(event.target.value);
                  setColor(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input'>
              <h4>Etat</h4>
              <input
                type='text'
                id='condition'
                name='condition'
                placeholder='ex: Neuf avec étiquette'
                onChange={(event) => {
                  console.log(event.target.value);
                  setCondition(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input'>
              <h4>Ville</h4>
              <input
                type='text'
                id='city'
                name='city'
                placeholder='ex: Paris'
                onChange={(event) => {
                  console.log(event.target.value);
                  setCity(event.target.value);
                }}
              ></input>
            </div>
            <div className='text-input-section'>
              <div className='text-input'>
                <h4>Prix</h4>
                <input
                  type='text'
                  id='price'
                  name='price'
                  placeholder='0.00€'
                  onChange={(event) => {
                    console.log(event.target.value);
                    setPrice(event.target.value);
                  }}
                ></input>
                <div className='checkbox-input'>
                  <input type='checkbox' name='ex'></input>
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className='form-button-div'>
            <button type='submit' className='form-validation'>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Publish;
