import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddResep from './components/AddResep';
import Login from "./components/Login";
import Register from './components/Register';
import Home from './container/Home';
import Resep from './container/Resep';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route  path="/home" element={<Home/>}/>
        <Route  path="/resep" element={<Resep/>}/>
        <Route  path="/add-resep" element={<AddResep/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
