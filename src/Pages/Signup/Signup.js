import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { json, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const { register, handleSubmit, formState:{errors}} = useForm();
    const navigate = useNavigate();
    const [token] = useToken(createdUserEmail);
    console.log(token);
    if (token) {
        navigate('/')
    }

    const handleSignUp = (data) => {
        setSignUPError('');
        console.log("data: ",data);
        console.log("errors: ",errors);
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            toast('User created successfully')
            const profile = {
                displayName: data.name
            }
            updateUserProfile(profile)
            .then(()=>{
                saveUser(data.name, data.email)
                
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
            console.log(error);
            setSignUPError(error.message)
        })
    }

    const saveUser = (name, email) =>{
        const user = {name, email};
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setCreatedUserEmail(email)
        })
    }

    
    return (
        <div className='h-[600px] flex justify-center items-center mx-2'>
            <div className='w-96 px-7 py-12 shadow-xl rounded'>
                <h2 className='text-4xl text-center'>Sign Up</h2>
                <p>{signUpError}</p>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name',{
                            required: "Name is required"
                        })} className="input input-bordered w-full max-w-xl"
                        />
                        {errors.name && <span className='text-error'>{errors.name.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email',{
                            required: "Email Address is required"
                        })} className="input input-bordered w-full max-w-xl"
                        />
                        {errors.email && <span className='text-error'>{errors.email.message}</span>}
                    </div>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password',{
                            required: 'Password is required',
                            minLength: {value: 6, message: "Password must be 6 characters!"},
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have an special character, capital letter and number.' }
                        })} className="input input-bordered w-full max-w-xl" />
                        {errors.password && <span className='text-error'>{errors.password.message}</span>}
                    </div>
                    <input type='submit' className="mt-4 btn btn-neutral text-white w-full max-w-xl" value="Sign Up" />
                    { signUpError && <p className='text-error'>{signUpError}</p> }
                </form>
                <p className='text-center mt-4'>Have an account?<Link to='/login' className='text-primary'>Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-neutral w-full'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Signup;