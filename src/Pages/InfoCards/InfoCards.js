import React from 'react';
import clock from '../../assets/icons/clock.svg';
import location from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import InfoCard from './InfoCard';
const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00am to 5.00pm',
            icon: clock, 
            color: 'bg-gradient-to-r from-secondary to-primary text-white'
        },
        {
            id: 2,
            name: 'Visit our location',
            description: 'Mirpur, Dhaka 1216, Bangladesh',
            icon: location, 
            color: 'bg-gradient-to-r from-neutral to-neutral text-white'
        },
        {
            id: 3,
            name: 'Contact us now',
            description: '+8801234565',
            icon: phone, 
            color: 'bg-gradient-to-r from-secondary to-primary text-white'
        }
    ]
    return (
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                cardData.map(card => <InfoCard key={card.id} card={card}></InfoCard>)
            }
            
        </div>
    );
};

export default InfoCards;