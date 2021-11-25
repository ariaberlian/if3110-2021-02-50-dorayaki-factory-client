import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import Register from './components/Register';
import Home from './container/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route  path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
