import React, { useState, useEffect } from 'react'
//import { param } from '../Customers';

export default function ShowCustomerTrearts(params) {
    const [treat, setTreat] = useState([]);
    const [producers, setProducers] = useState([]);
    const [phone, setPhone] = useState('');
    const ShowCustomersTreats = () => {
        fetch(`http://localhost:8081/customer/getCustomerByPhone/${phone}`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    let id = data[0].Id
                    fetch(`http://localhost:8081/customer/ShowCustomersTreats/${id}`, { method: "GET" })
                        .then(response => response.json())
                        .then(data => {
                            if (data) {

                                setTreat(data);
                            }
                            else {
                                alert('you have got problem in your details ')
                            }
                        })
                        .catch((err) => {
                            alert('failed to connect to the server')
                        })
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })

        fetch(`http://localhost:8081/customer/ShowProducers`, { method: "GET" })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setProducers(data);
                }
                else {
                    alert('you have got problem in your details ')
                }
            })
            .catch((err) => {
                alert('failed to connect to the server')
            })
    }

    return (
        <div>
            <label>הכנס מספר טלפון/ נייד</label><br />
            <input type="text" onChange={(e) => setPhone(e.target.value)}></input>
            <button onClick={ShowCustomersTreats}>הצג</button>
            <table>
                <tr>
                    <th>סטטוס</th>
                    <th>יצרן</th>
                    <th>תאריך</th>
                </tr>
                {treat.map(x => <tr key={x.Id}>
                    <td>{x.StatusTreat}</td>
                    <td>{producers.filter(p => p.Id == x.IdProducer).map(x => x.Name)}</td>
                    <td>{x.dateTreat.substring(0, 10)}</td>
                </tr>)}
            </table>
        </div>
    )
}