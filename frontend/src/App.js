import './App.css';
import FormComponent from './Components/form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Getvalues from './Components/getvalues';
import Login from './Components/Login';
import Update from './Components/Update';

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        < Route path="/getvalues" element={<Getvalues />} />
        <Route path="/login" element={<Login/>} />
        <Route path='/update/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
