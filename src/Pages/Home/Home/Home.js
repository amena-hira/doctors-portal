import React from 'react';
import InfoCards from '../../InfoCards/InfoCards';
import MakeAppointment from '../../MakeAppointment/MakeAppointment';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;