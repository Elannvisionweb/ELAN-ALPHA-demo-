import './Form.css';
import VerticalMarquee from '../VerticalMarquee/VerticalMarquee.jsx';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    teammate1Name: '',
    teammate1Email: '',
    teammate2Name: '',
    teammate2Email: '',
    teammate3Name: '',
    teammate3Email: '',
    teammate4Name: '',
    teammate4Email: '',
    teammate5Name: '',
    teammate5Email: '',
    teammate6Name: '',
    teammate6Email: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidIithEmail = (email) => {
    return email.endsWith('@iith.ac.in');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { leaderEmail, teammate1Email, teammate2Email, teammate3Email, teammate4Email, teammate5Email, teammate6Email } = formData;
    const emails = [leaderEmail, teammate1Email, teammate2Email, teammate3Email, teammate4Email, teammate5Email, teammate6Email];
    if (emails.some(email => email && !isValidIithEmail(email))) {
      setError('All emails must end with @iith.ac.in');
      return;
    }

    try {
      const response = await axios.post('backend.elan.org.in/api/register', formData, { withCredentials: true });
      // const response = await axios.post('http://localhost:5000/api/register', formData, { withCredentials: true });
      setMessage('Registration successful! Redirecting...');
      setFormData({
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        teammate1Name: '',
        teammate1Email: '',
        teammate2Name: '',
        teammate2Email: '',
        teammate3Name: '',
        teammate3Email: '',
        teammate4Name: '',
        teammate4Email: '',
        teammate5Name: '',
        teammate5Email: '',
        teammate6Name: '',
        teammate6Email: '',
      });

      setTimeout(() => {
        navigate('/nexus');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration!');
    }
  };

  return (
    <>
      <VerticalMarquee />
      <div className='registration-form-cont'>
        <h2 className='registration-form-heading'>Register for Nexus</h2>
        <form onSubmit={handleSubmit} className='registration-form'>

          <h3>Team Information</h3>
          <div className='indented-divs'>
            <label>Team Name&nbsp;&nbsp;</label><br />
            <input
              type='text'
              name='teamName'
              value={formData.teamName}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Leader Information</h3>
          <div className='indented-divs'>
            <label>Leader Name&nbsp;&nbsp;</label><br />
            <input
              type='text'
              name='leaderName'
              value={formData.leaderName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='indented-divs'>
            <label>Leader Email&nbsp;&nbsp;</label><br />
            <input
              type='email'
              name='leaderEmail'
              value={formData.leaderEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className='indented-divs'>
            <label>Leader Phone&nbsp;&nbsp;</label><br />
            <input
              type='tel'
              name='leaderPhone'
              value={formData.leaderPhone}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Teammates Information</h3>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className='teammate-info indented-divs'>
              <label>Teammate {index} Name&nbsp;&nbsp;</label><br />
              <input
                type='text'
                name={`teammate${index}Name`}
                value={formData[`teammate${index}Name`]}
                onChange={handleChange}
                required={index < 5}
              /><br />
              <label>Teammate {index} Email&nbsp;&nbsp;</label><br />
              <input
                type='email'
                name={`teammate${index}Email`}
                value={formData[`teammate${index}Email`]}
                onChange={handleChange}
                required={index < 5}
              />
            </div>
          ))}

          <button type='submit' className='register-button'>Register</button>
        </form>
        {message && <p className='success-message'>{message}</p>}
        {error && (
          <p className='error-message'>
            {error} Go back to <Link to='/nexus' className='underline-white'>Nexus&#8599;</Link>
          </p>
        )}
      </div>
    </>
  );
};

export default Form;
