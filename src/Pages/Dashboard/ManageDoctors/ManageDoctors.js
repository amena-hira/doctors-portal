import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors',{
                    headers:{
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                console.log(data)
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    })
    const handleDeleteDoctor = doctorId =>{
        console.log(doctorId)
        fetch(`http://localhost:5000/doctors/${doctorId}`,{
            method:'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data => {
            if (data.deletedCount >0 ) {
                refetch()
                toast.success('Doctor deleted successfully')
            }
        })
        
    }
    const closeModal = () =>{
        setDeletingDoctor(null)
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div >
            <h2 className="text-3xl">Manage Doctors</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length > 0 &&
                            doctors.map((doctor, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={doctor.image} alt=''/>
                                            </div>
                                        </div>
                                    </th>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                        <label 
                                        onClick={()=>setDeletingDoctor(doctor) }
                                        htmlFor="confirmation-modal" className='btn btn-xs btn-error text-white'>Delete</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                
            </div>
            {
                deletingDoctor&& 
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}, then it can not be undone`}
                    closeModal={closeModal}
                    modalData = {deletingDoctor}
                    successAction={handleDeleteDoctor}
                    buttonName='Delete'
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;