import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const PaymentPage = () => {
  const { orderId } = useParams(); // Get the order ID from the route params
  const [email, setEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuthContext(); // Get the authenticated user from context

  const handlePayment = async () => {
    // Initialize payment by calling the /checkout/pay route
    try {
      const response = await axios.post('https://backend-tesmi.vercel.app/checkout/pay', {
        email: user.email,
        totalAmount,
        orderId,
      });
      const { paymentUrl } = response.data;
      setPaymentUrl(paymentUrl);
      window.location.href = paymentUrl; // Redirect to the payment gateway
    } catch (err) {
      setError(err.response?.data.message || 'Error initializing payment');
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {paymentUrl ? (
        <p>Redirecting to payment...</p>
      ) : (
        <div>
          <p>Total Amount: {totalAmount} NGN</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;