import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-xl font-semibold text-center text-secondary">{name}</h2>
                <p>{slots.length >0? slots[0]: 'Try Another Day'}</p>
                <p>{slots.length} {slots.length >1 ? 'spaces': 'space'} Available</p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions mt-7 justify-center">
                    <label
                     disabled = {slots.length === 0}
                     className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white' htmlFor="booking-modal" onClick={()=>setTreatment(appointmentOption)}>Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;