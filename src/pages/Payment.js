import { useLocation } from 'react-router-dom';

//Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP'
);

const Payment = () => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  console.log(title);
  console.log(price);

  return (
    <>
      <span>Résumé de la commande</span>
      <br />
      {/* <span>Commande {price} €</span> */}
      <span>Frais protection acheteurs{title} €</span>
      <br />
      <span>Frais de port {title}€</span>
      <br />
      <span>Total {title}€</span>
      <br />
      <br />
      {/* <span>Il ne vous reste plus qu'une étape pour vous offrir {brand}.
Vous allez payer {total}(frais de protection et frais de port inclus).</span> */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Payment;
