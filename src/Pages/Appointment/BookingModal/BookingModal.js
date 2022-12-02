import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const BookingModal = ({ setTreatment, treatment, selected, refetch }) => {
    const {user} = useContext(AuthContext);
    const { name, slots, price } = treatment;
    const date = format(selected, 'PP');
    const handleBooking = event =>{
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patient = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: name,
            slot,
            patient,
            email,
            phone,
            price
        }
        
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.acknowledged) {
                setTreatment(null)
                toast.success('Booking Confirmed')
                refetch();
            }
            else{
                toast.error(data.message)
            }
        })
        setTreatment(null);
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={ handleBooking } className='mt-8'>
                        <input name='date' type="text" defaultValue={date} placeholder="Type here" className="input input-bordered w-full max-w-lg my-2" disabled />
                        <select name='slot' className="select select-bordered w-full max-w-lg my-2" required>
                            {
                                slots.map((slot, index) => <option 
                                    value={slot}
                                    key={index}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' defaultValue={user.displayName} readOnly type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg my-2" required/>
                        <input name='email' defaultValue={user.email} readOnly type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg my-2" required/>
                        <input name='phone' type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg my-2" required/>
                        <input className='btn w-full max-w-lg my-2' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;