import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

console.log(stripePromise);

const Payment = () => {

    const booking = useLoaderData();

    console.log(booking)
    const { treatment, price, appointmentDate, slot } = booking;
    
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className='text-xl'>Please pay $<strong>{price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='my-8'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;