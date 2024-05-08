// FormComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
const [name, setName] = useState('')
const [place,setplace] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [id,setid] = useState('')

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/postserver', { name, place, email, password});
      console.log(response.data);
      alert("Data Submitted Successfully");
      setName('');
      setplace('');
      setEmail('');
      setPassword('');
      setid('');
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='container-fluid bg-dark  m-0 w-100 ' style={{padding:'100px',height:'100vh'}}>
      <form className='container d-flex flex-column rounded  px-2 w-50 py-5 bg-primary align-items-center justfy-content-center ' onSubmit={handleSubmit}>
      <input className=' me-4 w-25 rounded m-2' type="text" name="name"  value={name} placeholder=' Name...' onChange={(e) => setName(e.target.value)} />
      <input className=' me-4 w-25 rounded m-2' type="text" name="place"  value={place} placeholder=' Place...' onChange={(e) => setplace(e.target.value)} />

      <input className=' me-4 w-25 rounded m-2' type="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' />
      <input className=' me-4 w-25 rounded m-2' type="password" name="password"  value={password} placeholder=' Passwrod...' onChange={(e) => setPassword(e.target.value)} />
      <input className=' me-4 w-25 rounded m-2' type="number" name="id"  value={id} placeholder=' Id' onChange={(e) => setid(e.target.value)} />


      <button className='btn btn-success' type="submit">Submit</button>
    </form>

    </div>
  );
};

export default FormComponent;
