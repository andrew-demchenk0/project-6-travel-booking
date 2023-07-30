import React from 'react';
import './bookings.scss';

const Bookings = ({ bookings, onCancelBooking }) => {
  if (bookings && bookings.length === 0) {
    return <div style={{ margin: '50px auto'}}>No bookings found</div>;
  }
  const sortedBookings = bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {sortedBookings.map((booking, index) => (
          <li key={index}
              data-test-id="booking"
              className="booking">
            <h3 data-test-id="booking-title"
                className="booking__title">
                {booking.tripData.title}
            </h3>
            <span data-test-id="booking-guests"
                  className="booking__guests">
                  {booking.guests} guests
            </span>
            <span data-test-id="booking-date"
                  className="booking__date">
                  {booking.date}
            </span>
            <span data-test-id="booking-total"
                  className="booking__total">
                  {booking.tripData.price * booking.guests} $
            </span>
            <button data-test-id="booking-cancel"
                    className="booking__cancel"
                    title="Cancel booking"
                    onClick={() => onCancelBooking(index)}>
              <span className="visually-hidden">Cancel booking</span>
              ×
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Bookings;
