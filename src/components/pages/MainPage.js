import React, { useState } from 'react';
import TripsFilter from '../tripsFilter/TripsFilter';
import TripsList from '../tripsList/TripsList';
import tripsData from '../../data/trips.json';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const isDurationInRange = (tripDuration) => {
    const [minDuration, maxDuration] = durationFilter.split("_x_");
    const tripDurationNumber = parseInt(tripDuration);
    const minDurationNumber = parseInt(minDuration);
    const maxDurationNumber = parseInt(maxDuration);
    return (
      (isNaN(minDurationNumber) || tripDurationNumber >= minDurationNumber) &&
      (isNaN(maxDurationNumber) || tripDurationNumber < maxDurationNumber)
    );
  };

  const filteredTrips = tripsData.filter((trip) => {
    const isDurationMatch = durationFilter ? isDurationInRange(trip.duration) : true;
    const isLevelMatch = levelFilter ? trip.level === levelFilter : true;
    const isSearchMatch = searchTerm ? trip.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;

    return isDurationMatch && isLevelMatch && isSearchMatch;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDurationFilter(event.target.value);
  };
  const handleLevelChange = (event) => {
    setLevelFilter(event.target.value);
  };

  return (
    <>
      <TripsFilter onSearchChange={handleSearchChange}
                   onDurationChange={handleDurationChange}
                   onLevelChange={handleLevelChange} />
      <TripsList trips={filteredTrips} />
    </>
  );
};

export default MainPage;
