import { Link, useLocation } from 'react-router-dom';
import userSVG from '../../resources/images/user.svg';
import briefcaseSVG from '../../resources/images/briefcase.svg';
import './appHeader.scss';
import { signOut } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const AppHeader = () => {
  const location = useLocation();
  const showNavigation = !['/auth/sign-up', '/auth/sign-in'].includes(location.pathname);
  const dispatch = useDispatch();
  const userFullName = localStorage.getItem('fullName');
  const handleSignOut = () => {
    dispatch(signOut());
    toast.success('You have successfully signed out.');
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/trips"
              data-test-id="header-logo"
              className="header__logo">
          Travel App
        </Link>
        {showNavigation && (
          <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link to="/bookings"
                      data-test-id="header-bookings-link"
                      className="nav-header__inner">
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseSVG} alt='booking'/>
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div data-test-id="header-profile-nav" className="nav-header__inner profile-nav">
                  <span className="visually-hidden">Profile</span>
                  <img src={userSVG} alt='user-icon'/>
                  <ul data-test-id="header-profile-nav-list" className="profile-nav__list">
                    <li data-test-id="header-profile-nav-username"
                        className="profile-nav__item profile-nav__username">
                      {userFullName}
                    </li>
                    <li className="profile-nav__item">
                      <Link to="/auth/sign-in"
                            data-test-id="header-profile-nav-sign-out"
                            className="profile-nav__sign-out button"
                            onClick={handleSignOut}>
                            Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default AppHeader;