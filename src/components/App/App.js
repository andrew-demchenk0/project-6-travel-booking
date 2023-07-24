import AppHeader from "../appHeader/AppHeader";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '../../css/style.css';
import AppFooter from "../appFooter/AppFooter";
import FiltersBlock from "../ filtersBlock/FiltersBlock";
import TravelList from "../travelList/TravelList";
import Bookings from "../bookings/Bookings";
import TripPage from "../pages/TripPage";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import Modal from "../modal/Modal";


function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <main>
          <FiltersBlock/>
          <TravelList/>
          <Bookings/>
          <TripPage/>
          <SignIn/>
          <SignUp/>
          <Modal/>
          <Routes>
            <Route/>
          </Routes>
        </main>
        <AppFooter/>
      </div>
    </Router>
  );
}

export default App;
