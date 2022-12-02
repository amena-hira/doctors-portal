import React from 'react';

const Review = ({ reviewCard }) => {
    const { name, image, review, location } = reviewCard;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{review}</p>
                <div className='flex items-center gap-4 pt-6'>
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    
                    <div>
                        <h2 className='text-xl'>{name}</h2>
                        <h4>{location}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;