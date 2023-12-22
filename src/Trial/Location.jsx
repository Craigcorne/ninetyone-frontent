import React, { useState } from "react";
import axios from "axios";
import { server } from "../server";

const Location = () => {
  const [location, setLocation] = useState(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });

          // Send the location data to the backend
          sendLocationToBackend(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const sendLocationToBackend = (latitude, longitude) => {
    // axios
    //   .post(`${server}/location/set-location`, { latitude, longitude })
    //   .then((response) => {
    //     console.log("Location data sent successfully!", response.data);
    //     // Handle any further actions upon successful data sending if needed.
    //   })
    //   .catch((error) => {
    //     console.error("Error sending location data:", error);
    //     // Handle errors appropriately.
    //   });
  };

  return (
    <div>
      <button onClick={handleLocationClick}>Accept Location</button>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Location;
