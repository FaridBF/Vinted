import { useLocation, useNavigate } from 'react-router-dom';

//Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP'
);

const Payment = ({ token }) => {
  console.log(token);
  const location = useLocation();
  const { title, price } = location.state;

  const buyerProtectionFees = (Number(price) * 0.1).toFixed(2);
  const shippingFees = (Number(price) * 0.2).toFixed(2);
  const total =
    Number(buyerProtectionFees) + Number(shippingFees) + Number(price);

  const Navigate = useNavigate();

  return token ? (
    <>
      <span>Résumé de la commande</span>
      <br />
      <br />
      <br />
      <span>Commande {price} €</span>
      <br />
      <br />
      <span>Frais protection acheteurs{buyerProtectionFees} €</span>
      <br />
      <br />
      <span>Frais de port {shippingFees}€</span>
      <br />
      <br /> <span>Total {total}€</span>
      <br />
      <br />
      <span>
        Il ne vous reste plus qu'une étape pour vous offrir {title}.
        <br />
        <br />
        Vous allez payer {total}(frais de protection et frais de port inclus).
      </span>
      <br />
      <br />
      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </>
  ) : (
    Navigate('/login')
  );
};

export default Payment;
