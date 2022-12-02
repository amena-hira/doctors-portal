import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const {login} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const[loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, {replace: true})
    }
    const handleLogin =( data ) =>{
        setLoginError('');
        login(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setLoginUserEmail(data.email)
        })
        .catch(error => {
            console.log(error);
            setLoginError(error.message)
        })

    }
    return (
        <div className='h-[600px] flex justify-center items-center mx-2'>
            <div className='w-96 px-7 py-12 shadow-xl rounded'>
                <h2 className='text-4xl text-center'>login</h2>
                {loginError && <p className='text-error'>{loginError}</p>}
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register(
                                "email", 
                                { required: "Email is required" }
                            )} 
                            className="input input-bordered w-full max-w-xl" 
                        />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xl">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" 
                            {...register(
                                "password",
                                { required: "Password is required" ,
                                minLength: { value: 6, message: "Password must be 6 characters" }
                            })
                            } 
                            className="input input-bordered w-full max-w-xl" />
                            {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                            
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    <input type='submit' className="mt-4 btn btn-neutral text-white w-full max-w-xl"  value="Login" />
                    
                </form>
                <p className='text-center'>New to Doctors Portal?<Link to='/signup' className='text-primary'>Create new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-neutral w-full'>Continue With Google</button>
            </div>
        </div>
    );
};

export default Login;