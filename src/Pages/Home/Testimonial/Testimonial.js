import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import Review from './Review';
const Testimonial = () => {
    const reviews = [
        {
            _id: 1,
            name: "Winson Herry",
            location: "california",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            image: people1
        },
        {
            _id: 2,
            name: "Winson Herry",
            location: "california",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            image: people1
        },
        {
            _id: 3,
            name: "Winson Herry",
            location: "california",
            review: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            image: people1
        }
    ]
    return (
        <section className='my-16'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-xl text-primary font-bold'>Testimonial</h4>
                    <h2 className="text-4xl">What Our Patient Says</h2>
                </div>
                <figure>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                
                {
                    reviews.map(review => 
                        <Review key={review._id} reviewCard={review}></Review>
                    )
                }
            </div>
        </section>
    );
};

export default Testimonial;