import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS for notifications
import Book from './Book'; // Ensure Book component exists

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [ticketCount, setTicketCount] = useState();
    const navigate = useNavigate(); // useNavigate to programmatically navigate

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if all inputs are filled
        if (!name || !email || !phone || ticketCount === '') {
            toast.error('All fields are required.', {
                position: toast.POSITION.TOP_CENTER, // Correct usage
            });
            return;
        }

        // Check if the ticket count is greater than 0
        if (ticketCount <= 0) {
            toast.error('Please enter a valid ticket count greater than 0.', {
                position: toast.POSITION.TOP_CENTER, // Correct usage
            });
            return;
        }

        // If everything is valid, navigate to the book page
        else{
            navigate('/book', { state: { ticketCount } });
        }
    };

    return (
        <div id='mainn'>
            <h1 id='heading'>Welcome to Indian Railway Ticket Booking Portal</h1>
            <div className='topp'>
                <h1>Book Your Ticket!</h1>
                
                <form id='input-field' onSubmit={handleSubmit}>
                    <div className="form-row">
                        <ul className="labels">
                            <li>Name:</li>
                            <li>Email-id:</li>
                            <li>Mobile:</li>
                            <li>No.of Tickets:</li>
                        </ul>
                        <div className="inputs">
                            <div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter your name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your Email-id" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    placeholder="Enter your Mobile" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                />
                            </div>
                            <div>
                                <input 
                                    type="number" 
                                    placeholder="Enter number of tickets" 
                                    value={ticketCount} 
                                    onChange={(e) => setTicketCount(Number(e.target.value))} 
                                />
                            </div>
                        </div>
                    </div>
                    <button id='btn1' type="submit">Proceed to Book</button>
                </form>
                <ToastContainer /> {/* Ensure ToastContainer is included to display the toast */}
            </div>
        </div>
    );
}

export default App;
