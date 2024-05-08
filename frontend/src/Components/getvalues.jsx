import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const GetValues = () => {
    let count=0;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5555/getserver')
            .then((result) => {
                // Create a Set to filter out duplicate users
                
                setUsers(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
   
    const Deletenow = (id) =>{
        axios.delete(`http://localhost:5555/deleteserver/${id}`)
        .then((result)=>{
            axios.get('http://localhost:5555/getserver')
            .then((result) => {
                // Create a Set to filter out duplicate users
                
                setUsers(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
            alert("Deleted Successfully");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='container-fluid bg-dark m-0 w-100 d-flex flex-column justify-content-center align-items-center p-5' style={{ height: '100vh' }}>
            {users.length!==0?
            <form className='container bg-dark  text-center text-white'>
                <table className="table table-dark">
                    <thead>
                        <tr className='border border-2 border-white'>
                        <th scope="col" className='text-primary'>No</th>
                            <th scope="col" className='text-success'>Name</th>
                            <th scope="col" className='text-info'>Place</th>
                            <th scope="col" className='text-warning'>Email</th>
                            <th scope="col" className='text-danger'>Password</th>
                            <th scope="col" className='text-secondary'>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            
                            <tr key={user._id}>
                                <td className="border border-2 border-white">{count++}</td>
                                <td className="border border-2 border-white">{user.name}</td>
                                <td className="border border-2 border-white">{user.place}</td>
                                <td className="border border-2 border-white">{user.email}</td>
                                <td className="border border-2 border-white">{user.password}</td>
                                <td className="border border-2 border-white">{user.id}</td>
                               <td className="border border-2 border-white" > 
                               <Link className=' btn bg-dark  text-secondary 'style={{border:'none'}} to={'/update/'+user._id} >
                                    <EditIcon/>
                                    </Link>
                                <Button className='bg-dark  text-danger' style={{border:'none'}} onClick={()=>Deletenow(user._id)}>
                                    <DeleteIcon/>
                                    </Button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>:
            <h1 className='text-danger p-3'>No datas here</h1>
                    }
        </div>
    );
}

export default GetValues;
