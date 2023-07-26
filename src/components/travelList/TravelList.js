import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import './travelList.scss';

const TravelList = ({ trips }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const loading = () => {
    setImagesLoaded(true);
  };

  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      <ul className="trip-list">
        {trips.map((trip) => (
          <li key={trip.id}
              data-test-id="trip-card"
              className="trip-card">
            {!imagesLoaded && <Spinner />}
            <div className="trip-card-image__wrapper">
              <img data-test-id="trip-card-image"
                   className="trip-card-image"
                   src={trip.image}
                   alt="trip photo"
                   style={{ display: imagesLoaded ? "block" : "none" }}
                   onLoad={loading}/>
            </div>
            <div className="trip-card__content">
              <div className="trip-info">
                <h3 data-test-id="trip-card-title"
                    className="trip-info__title">
                    {trip.title}
                </h3>
                <div className="trip-info__content">
                  <span data-test-id="trip-card-duration" className="trip-info__duration">
                    <strong>{trip.duration}</strong> days
                  </span>
                  <span data-test-id="trip-card-level"
                        className="trip-info__level">
                        {trip.level}
                  </span>
                </div>
              </div>
              <div className="trip-price">
                <span>Price</span>
                <strong data-test-id="trip-card-price-value"
                        className="trip-price__value">
                        {trip.price} $
                </strong>
              </div>
            </div>
            <Link to={`/trip/${trip.id}`}
                  data-test-id="trip-card-link"
                  className="button">
                  Discover a trip
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TravelList;

