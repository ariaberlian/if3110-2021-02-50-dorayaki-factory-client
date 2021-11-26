import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddBahanBaku from './components/AddBahanBaku';
import AddResep from './components/AddResep';
import EditBahanBaku from './components/EditBahanBaku';
import Login from "./components/Login";
import Register from './components/Register';
import RequestTokoList from './components/RequestTokoList';
import BahanBaku from './container/BahanBaku';
import Home from './container/Home';
import RequestToko from './container/RequestToko';
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
        <Route  path="/bahan-baku" element={<BahanBaku/>}/>
        <Route  path="/add-bahan-baku" element={<AddBahanBaku/>}/>
        <Route  path="/request-toko" element={<RequestToko/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
