import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking, getBookings } from '../../../redux/bookingSlice';
import './bookings.scss';
import { toast } from "react-toastify";
import { checkTokenAndExecuteRequest } from "../../helper/checkTokenAndExecuteRequest";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(getBookings())
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [dispatch]);

  const parsedBookings = bookings.map((booking) => ({
    ...booking,
    date: new Date(booking.date),
  }));

  const sortedBookings = parsedBookings.slice().sort((a, b) => a.date - b.date);

  if (sortedBookings.length === 0) {
    return <div style={{ margin: '50px auto' }}>No bookings found</div>;
  }

  const handleCancelBooking = async (bookingId) => {
    await checkTokenAndExecuteRequest(async () => {
      try {
        await dispatch(cancelBooking(bookingId));
        dispatch(getBookings());
        toast.success('Booking successfully deleted!')
      } catch (error) {
        toast.error('Error cancelling booking.');
        console.error('Error cancelling booking:', error);
      }
    });
  };

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {sortedBookings.map((booking, index) => (
          <li key={index} data-test-id="booking" className="booking">
            <h3 data-test-id="booking-title" className="booking__title">
              {booking.trip.title}
            </h3>
            <span data-test-id="booking-guests" className="booking__guests">
              {booking.guests} guests
            </span>
            <span data-test-id="booking-date" className="booking__date">
              {booking.date.toLocaleDateString()} {/* Показати дату у зрозумілому форматі */}
            </span>
            <span data-test-id="booking-total" className="booking__total">
              {booking.totalPrice} $
            </span>
            <button
              data-test-id="booking-cancel"
              className="booking__cancel"
              title="Cancel booking"
              onClick={() => handleCancelBooking(booking.id)}>
              <span className="visually-hidden">Cancel booking</span> ×
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Bookings;
