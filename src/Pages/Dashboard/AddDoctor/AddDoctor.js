import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    
    const navigate = useNavigate();
    const imageHostkey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostkey);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {data: specialties = [], isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async()=>{
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json();
            console.log(data)
            return data;
            
        }
    })
    const handleAddDoctor = (data) => {
        console.log(data.image[0].name);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostkey}`
        fetch(url,{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData =>{
            
            if (imgData.success) {
                console.log(imgData.data.url)
                const image = imgData.data.url;
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: image
                }

                // save doctor information to the database
                fetch('http://localhost:5000/doctors',{
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        toast.success('Doctor successfully added!');
                        console.log(data)
                        navigate('/dashboard/managedoctors')
                    }
                })
            }
        })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add A Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xl">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name', {
                        required: "Name is required"
                    })} className="input input-bordered w-full max-w-xl"
                    />
                    {errors.name && <span className='text-error'>{errors.name.message}</span>}
                </div>
                <div className="form-control w-full max-w-xl">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register('email', {
                        required: "Email Address is required"
                    })} className="input input-bordered w-full max-w-xl"
                    />
                    {errors.email && <span className='text-error'>{errors.email.message}</span>}
                </div>
                <div className="form-control w-full max-w-xl">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-bordered w-full max-w-xs">
                        
                        {
                            specialties.map(specialty => <option key={specialty._id} value={specialty.name}>{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xl">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register('image', {
                        required: "Photo is required"
                    })} className="file-input file-input-bordered w-full max-w-xl"
                    />
                    {errors.image && <span className='text-error'>{errors.image.message}</span>}
                </div>
                <input type='submit' className="mt-4 btn btn-neutral text-white w-full max-w-xl" value="Add Doctor" />
            </form>
        </div>
    );
};

/*
Three places to store images
1. third party image hosting server
2. File system of your mongodb
3. mongodb (database)
*/ 

export default AddDoctor;