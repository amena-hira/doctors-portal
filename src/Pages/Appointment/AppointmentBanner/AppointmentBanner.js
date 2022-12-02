import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selected, setSelected}) => {


    return (
        <header className='my-6'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse gap-6">
                    <img src={chair} className=" rounded-lg max-w-sm shadow-2xl" alt='' />
                    <div>
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;