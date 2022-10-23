import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const schema = yup.object({
    FirstName: yup.string().required(),
    LastName: yup.string().required(),
    City: yup.string().required(),
    Phone: yup.string().required().min(9).max(10),
    MobilePhone: yup.string().required().min(10).max(10),
    AddressCustomer: yup.string().required(),
    BirthDate: yup.date().required()
}).required();

export default function AddUpdateCustomer() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const onSubmit = data => {
        fetch(`http://localhost:8081/customer/addCustomer`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                navigate("/");
            })
            .catch(err => {
                alert('you have got problem in your details ')
                alert('failed to connect to the server ')
            })
    }
        ;

    return (
        <form onSubmit={handleSubmit(onSubmit)} class="form">
            <label>שם פרטי</label>
            <input {...register("FirstName")} />
            <p>{errors.FirstName?.message}</p>
            <label>שם משפחה</label>
            <input {...register("LastName")} />
            <p>{errors.LastName?.message}</p>
            <label>עיר</label>
            <input {...register("City")} />
            <p>{errors.City?.message}</p>
            <label>כתובת</label>
            <input {...register("AddressCustomer")} />
            <p>{errors.AddressCustomer?.message}</p>
            <label>טלפון</label>
            <input {...register("Phone")} />
            <p>{errors.Phone?.message}</p>
            <label>טלפון נייד</label>
            <input {...register("MobilePhone")} />
            <p>{errors.MobilePhone?.message}</p>
            <label>תאריך לידה</label>
            <input {...register("BirthDate")} />
            <p>{errors.BirthDate?.message}</p>
            <input type="submit" />
        </form>
    );
}