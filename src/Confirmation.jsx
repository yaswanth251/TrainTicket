import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Confirmation.css'

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats } = location.state || { selectedSeats: [] };

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [passengerDetails, setPassengerDetails] = useState(
        selectedSeats.map(() => ({ name: '', age: '', gender: '' }))
    );

    const handlePassengerChange = (index, field, value) => {
        const updatedDetails = [...passengerDetails];
        updatedDetails[index][field] = value;
        setPassengerDetails(updatedDetails);
    };

    const handleConfirm = () => {
        if (!pickup || !destination || !travelDate) {
            toast.error('Please fill in all details.');
            return;
        }
        navigate('/receipt', { state: { passengerDetails, travelDate } });
    };

    return (
        <>
        <h1>Confirmation</h1>
        <div className='info'>
            
            <div>
                <label>Pickup:</label>
                <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} />
            </div>
            <div>
                <label>Destination:</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div>
                <label>Travel Date:</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
            </div>
            </div>
            <div className="names">
            {passengerDetails.map((passenger, index) => (
                <div key={index} id='person'>
                    <h4>Passenger {index + 1}</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    />
                    <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            ))}
            <button id='btn3' onClick={handleConfirm}>Confirm</button>
            <ToastContainer />
            </div>
        </>
    );
};

export default Confirmation;
