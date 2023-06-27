
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './main/Home';
import Login from './auth/Login';
import AddItem from './main/AddItem';

import { Pending } from './reports/Pending';
import { Dispatch } from './reports/Dispatch';
import { Transit } from './reports/Transit';
import { General } from './reports/General';
import OrderDetails from './reports/OrderDetails';
import { Orders } from './reports/Orders';
import DateTest from './reports/DateTest';
import { Final } from './reports/Final';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Login />} />
          <Route path='/additem' element={<AddItem />} />
          <Route path='/pending' element={<Pending />} />
          <Route path='/dispatch' element={<Dispatch />} />
          <Route path='/transit' element={<Transit />} />
          <Route path='/general' element={<General />} />
          <Route path='/orderDetails' element={<OrderDetails />}/>
          <Route path='/orders' element={<Orders />} />
          <Route path="/date" element={<DateTest />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
