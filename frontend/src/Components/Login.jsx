import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-bootstrap';
import { Container } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState(''); // Initialize with an empty string
  const [password, setPassword] = useState(''); // Initialize with an empty string
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5555/getserver')
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      alert('Login successful \n Hey \t' + user.name);
      setPassword('');
      setEmail('');
    } else {
      alert('Login failed');
    }
  };
  
  return (
    <div className='container-fluid w-100 bg-dark text-white d-flex justfy-content-center align-items-center' style={{ height: '100vh' }}>
      <Container className='col-md-4 bg-white border border-2-primary rounded text-center text-dark p-3'>
        <h2>Login now</h2>
        <form onSubmit={formSubmit} className='p-3 d-flex flex-column gap-2'>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='me-2 rounded text-center p-2' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='me-2 rounded text-center p-2' />
          <button type="submit" className='w-100 bg-primary border-0 text-white mt-3'>Login</button> {/* Use button element for form submission */}
        </form>
      </Container>
    </div>
  );
};

export default Login;
