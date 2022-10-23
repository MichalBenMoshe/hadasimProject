import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import AddUpdateCustomer from './addCustomer';
import ShowCustomerTrearts from './showCustomerTreats';
import { Link } from 'react-router-dom';

export default function ShowWriters() {
    const [sicks, setSicks] = useState([]);
    const [notImmunized, setNotImmunized] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/customer/getSicksEachDay`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setSicks(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })
            fetch(`http://localhost:8081/customer/getNotImmunized`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setNotImmunized(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })
    }, [])
   
    return (
        <div>
            <label>כמות האנשים שלא התחסנו כלל</label>
            {notImmunized.map(x => 
                    <input value={x.cnt}/>
                    )}<br/>
            <table>
                <label>מספר החולים בכל יום בחודש האחרון:</label>
                <tr>
                    <th>יום</th>
                    <th>כמות חולים</th>
                </tr>
                {sicks.map(x => <tr>
                    <td>{x.dayT}</td>
                    <td>{x.cnt}</td>
                    </tr>
             )}
            </table>
        </div>
    )
}