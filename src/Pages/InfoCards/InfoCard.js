import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, icon, color} = card;
    return (
        <div className={`${color} text-white card md:card-side shadow-xl p-6`}>
            <figure><img src={icon} alt="Movie"/></figure>
            <div className="card-body ">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;