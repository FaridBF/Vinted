import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage('');

      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/signup',
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter
        }
      );
      if (response.data) {
        console.log("J'ai bien réussi à créer un compte");
        setUser(response.data.token);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage('Cet email a déjà un compte ! ');
      }
    }
  };
  return (
    <div className='signup-container'>
      <h1 className='sign-form-title'>S'inscrire</h1>
      <form className='signup-form' onSubmit={handleSignup}>
        <input
          type='text'
          placeholder='Nom d utilisateur'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className='checkbox-container'>
          <div className='newsLetters'>
            <input
              className='checkbox'
              type='checkbox'
              placeholder='test'
              value={newsletter}
              onChange={(event) => setNewsletter(event.target.checked)}
            />
            <span>S'inscire à la newsletter</span>
          </div>
          <span className='conditions-signup'>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans
          </span>
        </div>
        <button className='button-connecter' type='submit'>
          S'inscrire
        </button>
        <p style={{ color: 'red' }}>{errorMessage}</p>

        <a href='http://localhost:3000/login'>
          Tu as déjà un compte ? Connecte-toi !
        </a>
      </form>
    </div>
  );
};

export default Signup;
