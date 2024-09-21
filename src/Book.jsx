import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Book.css';

const Book = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketCount } = location.state || { ticketCount: 0 };

    const rows = 12;
    const seatsPerRow = 7;
    const lastRowSeats = 3;

    const seatArrangement = Array.from({ length: rows }, (_, rowIndex) => {
        const seatsInThisRow = rowIndex === rows - 1 ? lastRowSeats : seatsPerRow;
        return Array.from({ length: seatsInThisRow }, (_, seatIndex) => ({
            row: rowIndex + 1,
            seat: seatIndex + 1,
            isSelected: false,
        }));
    });

    const [seats, setSeats] = useState(seatArrangement);
    const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seat = seats[rowIndex][seatIndex];

        if (!seat.isSelected && selectedSeatsCount >= ticketCount) {
            toast.error(`You can only select ${ticketCount} seat(s).`);
            return;
        }

        const updatedSeats = seats.map((row, rIndex) =>
            row.map((seat, sIndex) => {
                if (rIndex === rowIndex && sIndex === seatIndex) {
                    const isSelected = !seat.isSelected;
                    setSelectedSeatsCount(prevCount => prevCount + (isSelected ? 1 : -1));
                    return { ...seat, isSelected };
                }
                return seat;
            })
        );

        setSeats(updatedSeats);
        if (seat.isSelected) {
            setSelectedSeats(selectedSeats.filter(s => s.row !== seat.row || s.seat !== seat.seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleBook = () => {
        if (selectedSeatsCount < ticketCount) {
            toast.error(`Please select ${ticketCount} seat(s).`);
            return;
        }
        navigate('/confirmation', { state: { selectedSeats } });
    };

    return (
        <div>
            <h1>Reserve Your Seat!</h1>
            <div className="aa">
            <p>Total Tickets: {ticketCount}</p>
            <p>Seats Selected: {selectedSeatsCount}</p>
            </div>
            <div className="seating-area">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat, seatIndex) => (
                            <div
                                key={seatIndex}
                                className={`seat ${seat.isSelected ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(rowIndex, seatIndex)}
                            >
                                {seat.row}-{seat.seat}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button id="btn2" onClick={handleBook}>Confirm</button>
            <ToastContainer />
        </div>
    );
};

export default Book;
