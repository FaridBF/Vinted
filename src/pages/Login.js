import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/user/login',
        {
          email: email,
          password: password
        }
      );

      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleLogin}>
        <h1 className='sign-form-title'>Se connecter</h1>
        <input
          value={email}
          placeholder='Adresse email'
          type='email'
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='button-connecter' type='submit'>
          Se connecter
        </button>
        <a href='http://localhost:3000/signup'>
          Pas encore de compte ? Inscrit-toi !
        </a>
      </form>
    </div>
  );
};

export default Login;
