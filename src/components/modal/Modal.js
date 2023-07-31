import React, { useState } from 'react';
import './modal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bookTrip } from '../../redux/bookingSlice';
import { toast } from "react-toastify";

const Modal = ({ isOpen, onClose, tripData }) => {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
  };

  const handleGuestsChange = (event) => {
    const numGuests = parseInt(event.target.value);
    setGuests(numGuests);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const bookingData = { tripId: tripData.id, userId: authUser.id, guests, date };
    dispatch(bookTrip(bookingData));
    toast.success('Trip is booked, go booking to view')
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div data-test-id="book-trip-popup" className="book-trip-popup">
        <button data-test-id="book-trip-popup-close"
                className="book-trip-popup__close"
                onClick={onClose}>
                ×
        </button>
        <form className="book-trip-popup__form"
              autoComplete="off"
              onSubmit={handleFormSubmit}>
          <div className="trip-info">
            <h3 data-test-id="book-trip-popup-title"
                className="trip-info__title">
              {tripData.title}
            </h3>
            <div className="trip-info__content">
              <span data-test-id="book-trip-popup-duration" className="trip-info__duration">
                <strong>{tripData.duration}</strong> days
              </span>
              <span data-test-id="book-trip-popup-level"
                    className="trip-info__level">
                    {tripData.level}
              </span>
            </div>
          </div>
          <label className="input">
            <span className="input__heading">Date</span>
            <input data-test-id="book-trip-popup-date"
                   name="date"
                   type="date"
                   required
                   min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                   value={date}
                   onChange={handleDateChange}/>
          </label>
          <label className="input">
            <span className="input__heading">Number of guests</span>
            <input data-test-id="book-trip-popup-guests"
                   name="guests"
                   type="number"
                   min="1"
                   max="10"
                   value={guests}
                   onChange={handleGuestsChange}
                   required/>
          </label>
          <span className="book-trip-popup__total">
            Total:
            <output data-test-id="book-trip-popup-total-value"
                    className="book-trip-popup__total-value">
                    {tripData.price * guests}$
            </output>
          </span>
          <button data-test-id="book-trip-popup-submit"
                  className="button"
                  type="submit">
                  Book a trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
