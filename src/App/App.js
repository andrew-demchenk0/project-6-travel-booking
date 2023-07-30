import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from "../components/helper/PrivateRoute";

import AppHeader from '../components/appHeader/AppHeader';
import AppFooter from '../components/appFooter/AppFooter';
import Spinner from '../components/spinner/Spinner';
import {ToastContainer} from "react-toastify";


const MainPage = lazy(() => import('../components/pages/MainPage'));
const BookingPage = lazy(() => import('../components/pages/bookings/Bookings'));
const TripInfoPage = lazy(() => import('../components/pages/tripInfo/TripInfo'));
const SignInPage = lazy(() => import('../components/pages/signIn/SignIn'));
const SignUpPage = lazy(() => import('../components/pages/signUp/SignUp'));

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
              <Route exact path="/trips" element={<PrivateRoute element={<MainPage />}></PrivateRoute>} />
              <Route exact path="/auth/sign-up" element={<SignUpPage />} />
              <Route exact path="/auth/sign-in" element={<SignInPage />} />
              <Route exact path="/bookings" element={<PrivateRoute element={<BookingPage bookings={bookings} onCancelBooking={onCancelBooking} />}></PrivateRoute>} />
              <Route exact path="/trips/:tripId" element={<PrivateRoute element={<TripInfoPage addBooking={addBooking} />}></PrivateRoute>} />
              <Route path="*" element={<PrivateRoute element={<MainPage />}></PrivateRoute>} />
            </Routes>
          </Suspense>
        </main>
        <AppFooter />
        <ToastContainer position="top-right"
                        autoClose={2000}
                        limit={3}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover={false}
                        theme="light"/>
      </div>
    </Router>
  );
  // return (
  //   <Router>
  //     <div className="App">
  //       <AppHeader />
  //       <main>
  //         <Suspense fallback={<Spinner />}>
  //           <Routes>
  //             <Route exact path="/" element={<MainPage />} />
  //             <Route exact path="/auth/sign-up" element={<SignUpPage />} />
  //             <Route exact path="/auth/sign-in" element={<SignInPage />} />
  //             <Route exact path="/bookings" element={<BookingPage bookings={bookings} onCancelBooking={onCancelBooking} />} />
  //             <Route exact path="/trip/:tripId" element={<TripInfoPage addBooking={addBooking} />} />
  //             <Route path="*" element={<MainPage />} />
  //           </Routes>
  //         </Suspense>
  //       </main>
  //       <AppFooter />
  //       <ToastContainer/>
  //     </div>
  //   </Router>
  // );
}

export default App;
