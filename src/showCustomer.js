import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import AddUpdateCustomer from './addCustomer';
import ShowCustomerTrearts from './showCustomerTreats';
import { Link } from 'react-router-dom';

export default function ShowWriters() {
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/customer/showCustomers`, { method: "GET" })
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
                alert('failed to connect to the server')
            })
    }, [])
    const customerDelete = data => {
        fetch(`http://localhost:8081/customer/DeleteCustomer/${data}`,
            {
                method: "POST",
            })
            .then(response => response.json())
            .then(() => {
                const c = customer.filter(x => x.Id !== data)
                setCustomer(c);
            })
            .catch(err => {
                alert('you have got problem in your details ')
            })
    };
    return (
        <div>
            <NavLink to="addUpdateCustomer">הוספת לקוח</NavLink><br />
            <NavLink to="ShowCustomerTrearts">לצפייה בטיפולים</NavLink><br/>
            <NavLink to="showResults">תצוגה סיכומית בנושא הקורונה</NavLink>
            <table>
                <tr>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>עיר</th>
                    <th>כתובת</th>
                    <th>טלפון</th>
                    <th>טלפון נייד</th>
                    <th>תאריך לידה</th>
                </tr>
                {customer.map(x => <tr key={x.Id}>
                    <td>{x.FirstName}</td>
                    <td>{x.LastName}</td>
                    <td>{x.City}</td>
                    <td>{x.AddressCustomer}</td>
                    <td>{x.Phone}</td>
                    <td>{x.MobilePhone}</td>
                    <td>{x.BirthDate.substring(0, 10)}</td>
                    <td><button onClick={() => customerDelete(x.Id)}>מחיקה</button></td>
                    <Link to={{
                        pathname: `/updateCustomer/:${x.Id}`,
                    }}>עריכה</Link>
                </tr>)}
            </table>
        </div>
    )
}