import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddUpdateCustomer from './addCustomer'
import ShowCustomerTrearts from './showCustomerTreats'
import ShowCustomers from './showCustomer'
import UpdateCustomer from './updateCustomer'
import ShowResults from './ShowResults'
import './App.css';
import { useState } from 'react';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<ShowCustomers />} />
          <Route path='/showCustomers' element={<ShowCustomers />} />
          <Route path='/addUpdateCustomer' element={<AddUpdateCustomer />} />
          <Route path='/showCustomerTrearts' element={<ShowCustomerTrearts />} />
          <Route path='/updateCustomer/:id' element={<UpdateCustomer />} />
          <Route path='/showResults' element={<ShowResults />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
