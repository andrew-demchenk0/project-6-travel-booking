import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../modal/Modal';
import './tripInfo.scss';
import { getTripById } from "../../../redux/tripSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../spinner/Spinner";

const TripInfo = () => {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const selectedTrip = useSelector((state) => state.trips.selectedTrip);
  const loading = useSelector((state) => state.trips.loading);
  const error = useSelector((state) => state.trips.error);

  useEffect(() => {
    dispatch(getTripById(tripId))
      .catch((error) => {
        console.error('Error fetching trip details:', error);
      });
  }, [dispatch, tripId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return console.error('Error fetching trip details:', error);
  }

  if (!selectedTrip) {
    return <div style={{ margin: '50px auto' }}>Trip not found</div>;
  }

  return (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img data-test-id="trip-details-image"
             src={selectedTrip.image}
             className="trip__img"
             alt="trip photo"/>
        <div className="trip__content">
          <div className="trip-info">
            <h3 data-test-id="trip-details-title"
                className="trip-info__title">
                {selectedTrip.title}
            </h3>
            <div className="trip-info__content">
              <span data-test-id="trip-details-duration" className="trip-info__duration">
                <strong>{selectedTrip.duration}</strong> days
              </span>
              <span data-test-id="trip-details-level"
                    className="trip-info__level">
                    {selectedTrip.level}
              </span>
            </div>
          </div>
          <div data-test-id="trip-details-description"
               className="trip__description">
               {selectedTrip.description}
          </div>
          <div className="trip-price">
            <span>Price</span>
            <strong data-test-id="trip-details-price-value"
                    className="trip-price__value">
                    {selectedTrip.price} $
            </strong>
          </div>
          <button data-test-id="trip-details-button"
                  className="trip__button button"
                  onClick={handleOpenModal}>
                  Book a trip
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}
               onClose={handleCloseModal}
               tripData={selectedTrip}/>
      )}
    </main>
  );
}

export default TripInfo;
