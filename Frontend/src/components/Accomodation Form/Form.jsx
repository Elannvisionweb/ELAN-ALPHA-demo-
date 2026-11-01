import './Form.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        college: '',
        days: '',
        amount: '',
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        const { name, phone, college, days, amount } = formData;

        try {

            const response = await axios.post('backend.elan.org.in/user/accomodate', formData, { withCredentials: true });
            setMessage('Accomodation Booked Successfully!')
            setFormData({
                name: '',
                phone: '',
                college: '',
                days: '',
                amount: '',
            });

        } catch (err) {
            setError(err.response?.data?.message || 'An error occured while processing you request.')
        }

    };

    return (
        <>
            <div className="form-container">

                <form onSubmit={handleSubmit}>

                    <div className="accomodation-form">

                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' required />

                        <input type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={10} minLength={10} name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' required />

                        <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder='College' required />

                        <input type="number" min={1} name="days" value={formData.days} onChange={handleChange} placeholder='No. of Days' required />

                        <input type="number" min={1} name="amount" value={formData.amount} onChange={handleChange} placeholder='Amount Paid' required />

                    </div>

                    <button type="submit">Submit</button>

                </form>

                {message && <p className="success-message">{message}</p>}
                {error && (
                    <p className="error-message">
                        {error} Go back to <Link to="/">Home</Link>
                    </p>
                )}
            </div>
        </>
    );

}

export default Form;