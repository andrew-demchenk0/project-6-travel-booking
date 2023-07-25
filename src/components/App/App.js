import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';
import Spinner from '../spinner/Spinner';
import '../../css/style.css';

const MainPage = lazy(() => import('../pages/MainPage'));
const Bookings = lazy(() => import('../bookings/Bookings'));
const TripPage = lazy(() => import('../pages/TripPage'));
function App() {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings([...bookings, booking]);
  };

  const onCancelBooking = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/sign-in" element={<SignIn />} />
              <Route exact path="/bookings" element={<Bookings bookings={bookings} onCancelBooking={onCancelBooking} />} />
              <Route exact path="/trip/:tripId" element={<TripPage addBooking={addBooking} />} />
              <Route path="*" element={<MainPage />} />
            </Routes>
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
