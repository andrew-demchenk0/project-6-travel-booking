import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from "../components/helper/PrivateRoute";
import { fetchCurrentUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppHeader from '../components/appHeader/AppHeader';
import AppFooter from '../components/appFooter/AppFooter';
import Spinner from '../components/spinner/Spinner';

const MainPage = lazy(() => import('../components/pages/MainPage'));
const BookingPage = lazy(() => import('../components/pages/bookings/Bookings'));
const TripInfoPage = lazy(() => import('../components/pages/tripInfo/TripInfo'));
const SignInPage = lazy(() => import('../components/pages/signIn/SignIn'));
const SignUpPage = lazy(() => import('../components/pages/signUp/SignUp'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route exact path="/trips" element={<PrivateRoute element={<MainPage/>}></PrivateRoute>}/>
              <Route exact path="/auth/sign-up" element={<SignUpPage/>}/>
              <Route exact path="/auth/sign-in" element={<SignInPage/>}/>
              <Route exact path="/bookings" element={<PrivateRoute element={<BookingPage/>}></PrivateRoute>}/>
              <Route exact path="/trips/:tripId" element={<PrivateRoute element={<TripInfoPage/>}></PrivateRoute>}/>
              <Route path="*" element={<PrivateRoute element={<MainPage/>}></PrivateRoute>}/>
            </Routes>
          </Suspense>
        </main>
        <AppFooter/>
        <ToastContainer className='notification'
                        position="top-right"
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
}

export default App;
