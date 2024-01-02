import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((resData) => {
  //       return resData.json();
  //     })
  //     .then((actualData) => {
  //       setAvailablePlaces(actualData.places);
  //     });
  // });

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true);

        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error !== "") {
    return <Error title={"An Error has ocurred!"} message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching Places...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
