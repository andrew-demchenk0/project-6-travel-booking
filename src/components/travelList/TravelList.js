const TravelList = () => {
  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      <ul className="trip-list">
        <li data-test-id="trip-card" className="trip-card">
          <img data-test-id="trip-card-image" src="https://i.gyazo.com/9692ef5341a64659e8a211f19808732f.jpg" alt="trip photo"/>
          <div className="trip-card__content">
            <div className="trip-info">
              <h3 data-test-id="trip-card-title" className="trip-info__title">
                Iceland
              </h3>
              <div className="trip-info__content">
                  <span data-test-id="trip-card-duration" className="trip-info__duration">
                    <strong>15</strong> days
                  </span>
                <span data-test-id="trip-card-level" className="trip-info__level">
                    easy
                  </span>
              </div>
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong data-test-id="trip-card-price-value" className="trip-price__value">
                7000 $
              </strong>
            </div>
          </div>
          <a data-test-id="trip-card-link" href="#" className="button">
            Discover a trip
          </a>
        </li>
      </ul>
    </section>
  );
}

export default TravelList;