import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../modal/Modal';
import tripsData from '../../data/trips.json';

const TripPage = ({ addBooking }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { tripId } = useParams();
  const trip = tripsData.find((trip) => trip.id === tripId);

  if (!trip) {
    return <div style={{ margin: '50px auto'}}>Trip not found</div>;
  }

  const handleOpenModal = () => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img data-test-id="trip-details-image"
             src={trip.image}
             className="trip__img"
             alt="trip photo"/>
        <div className="trip__content">
          <div className="trip-info">
            <h3 data-test-id="trip-details-title"
                className="trip-info__title">
                {trip.title}
            </h3>
            <div className="trip-info__content">
              <span data-test-id="trip-details-duration" className="trip-info__duration">
                <strong>{trip.duration}</strong> days
              </span>
              <span data-test-id="trip-details-level"
                    className="trip-info__level">
                    {trip.level}
              </span>
            </div>
          </div>
          <div data-test-id="trip-details-description"
               className="trip__description">
               {trip.description}
          </div>
          <div className="trip-price">
            <span>Price</span>
            <strong data-test-id="trip-details-price-value"
                    className="trip-price__value">
                    {trip.price} $
            </strong>
          </div>
          <button data-test-id="trip-details-button"
                  className="trip__button button"
                  onClick={handleOpenModal}>
                  Book a trip
          </button>
        </div>
      </div>
      {selectedTrip && (
        <Modal isOpen={isModalOpen}
               onClose={handleCloseModal}
               tripData={selectedTrip}
               onSaveBooking={(bookingData) => {
                 addBooking(bookingData);
                 setSelectedTrip(null);
               }}
        />
      )}
    </main>
  );
}

export default TripPage;
