import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import AddUpdateCustomer from './addCustomer';
import ShowCustomerTrearts from './showCustomerTreats';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import ShowCustomer from './showCustomer';
import cloneDeep from 'lodash/cloneDeep';
import { useNavigate } from 'react-router-dom'


export default function UpdateCustomer() {
    const [customer, setCustomer] = useState([]);
    const navigate = useNavigate();
    let location = useLocation();
    useEffect(() => {
        let id = parseInt(location.pathname.substring(17).toString())
        fetch(`http://localhost:8081/customer/ShowCustomer/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setCustomer(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server bla bla')
            })
    }, [])
    const updateCustomer = () => {
        fetch(`http://localhost:8081/customer/UpdateCustomer/${customer[0].Id}/${customer[0].FirstName}/${customer[0].LastName}/${customer[0].City}/${customer[0].AddressCustomer}/${customer[0].Phone}/${customer[0].MobilePhone}/${customer[0].BirthDate}`,
            {
                method: "POST",
            })
            .then(response => response.json())
            .then(data => {
                navigate("/");
            })
            .catch(err => {
                alert('you have got problem in your details ')
            })
    };
    const update = (val, index) => {
        customer[0][index] = val.toString()
    }
    return (
        <div>
            <table>
                <tr>
                </tr>
                {customer.map(x => <div>
                    <label>שם פרטי</label>
                    <input type="text" placeholder={x.FirstName} name="FirstName" onChange={(e) => update(e.target.value, e.target.name)} /> <br />
                    <label>שם משפחה</label>
                    <input placeholder={x.LastName} name="LastName" onChange={(e) => update(e.target.value, e.target.name)} />  <br />
                    <label>עיר</label>
                    <input placeholder={x.City} name="City" onChange={(e) => update(e.target.value, e.target.name)} />  <br />
                    <label>כתובת</label>
                    <input placeholder={x.AddressCustomer} name="AddressCustomer" onChange={(e) => update(e.target.value, e.target.name)} />  <br />
                    <label>טלפון</label>
                    <input placeholder={x.Phone} name="Phone" onChange={(e) => update(e.target.value, e.target.name)} /> <br />
                    <label>טלפון נייד</label>
                    <input placeholder={x.MobilePhone} name="MobilePhone" onChange={(e) => update(e.target.value, e.target.name)} /> <br />
                    <label>תאריך לידה</label>
                    <input placeholder={x.BirthDate.substring(0, 10)} type={Date} name="BirthDate" onChange={(e) => update(e.target.value, e.target.name)} />
                </div>)}
            </table>
            <td><button onClick={() => updateCustomer()}>עדכן</button></td>

        </div>
    )
}