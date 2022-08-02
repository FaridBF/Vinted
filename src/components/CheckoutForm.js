import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import axios from 'axios';

const CheckoutForm = (price, title) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur"
    });
    const response = await axios.post(
      'https://lereacteur-vinted-api.herokuapp.com/payment',
      {
        stripeToken: stripeResponse.token.id,
        title: title,
        amount: price
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === 'succeeded') {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type='submit'>Payer</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
