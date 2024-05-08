import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [id, setId] = useState('');
   const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5555/getserver/${id}`)
            .then((user) => {
                
                        setName(user.data.name);
                        setPlace(user.data.place);
                        setEmail(user.data.email);
                        setPassword(user.data.password);
                        // setId(user._id);
                     
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, [id]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5555/updateserver/`+id,{name,email,password})
            .then((res) => {
                console.log("Updated Successfully:", res.data);
                alert("Updated Successfully");
                navigate('/getvalues');
            })
            .catch((err) => {
                console.log("Error updating data:", err);
            });
            setName('');
                        setPlace('');
                        setEmail('');
                        setPassword('');
                        // setId('');
    };

    return (
        <Container fluid className='w-100 bg-white text-dark text-center d-flex justify-content-center align-items-center p-5'>
            <form className='container d-flex flex-column rounded px-2 w-50 py-5 bg-dark align-items-center justify-content-center' onSubmit={handleSubmit}>
                <input className='me-4 w-25 rounded m-2' type="text" name="name" value={name} placeholder=' Name...' onChange={(e) => setName(e.target.value)} />
                <input className='me-4 w-25 rounded m-2' type="text" name="place" value={place} placeholder=' Place...' onChange={(e) => setPlace(e.target.value)} />
                <input className='me-4 w-25 rounded m-2' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
                <input className='me-4 w-25 rounded m-2' type="password" name="password" value={password} placeholder=' Password...' onChange={(e) => setPassword(e.target.value)} />
                {/* <input className='me-4 w-25 rounded m-2' type="number" name="id" value={id} placeholder=' Id' onChange={(e) => setId(e.target.value)} readOnly /> Id should be read-only */}
                <button className='btn btn-success' type="submit">Update</button>
            </form>
        </Container>
    );
};

export default Update;
