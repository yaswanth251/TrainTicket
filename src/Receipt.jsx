import React from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css'
const Receipt = () => {
    const location = useLocation();
    const { passengerDetails, travelDate } = location.state || { passengerDetails: [], travelDate: '' };
    return (
        <div>
            <h1>Receipt</h1>
            <p>Travel Date: {travelDate}</p>
            {passengerDetails.map((passenger, index) => (
                <div key={index} className="receipt">
                    <h4>Passenger {index + 1}</h4>
                    <p>Name: {passenger.name}</p>
                    <p>Age: {passenger.age}</p>
                    <p>Gender: {passenger.gender}</p> {/* Added Gender display */}
                </div>
            ))}
        </div>
    );
};

export default Receipt;
