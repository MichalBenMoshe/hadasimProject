const express = require('express');
const router = express.Router();
const customer = require('./queryCustomer');
router.get('/showCustomersTreats/:Id',customer.ShowCustomersTreats )
router.post('/addCustomer', customer.AddCustomer)
router.get('/showCustomers', customer.ShowCustomers)
router.get('/ShowCustomer/:Id', customer.ShowCustomer)
router.post('/DeleteCustomer/:Id', customer.DeleteCustomer)
router.post('/UpdateCustomer/:Id/:FirstName/:LastName/:City/:Address/:Phone/:MobilePhone/:BirthDate', customer.UpdateCustomer)
router.get('/ShowProducers', customer.ShowProducers)
router.get('/getCustomerByPhone/:phone', customer.GetCustomerByPhone)
router.get('/getSicksEachDay',customer.GetSicksEachDay)
router.get('/getNotImmunized',customer.GetNotImmunized)


module.exports=router