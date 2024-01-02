export async function fetchUserPlaces() {
  const responses = await fetch("http://localhost:3000/user-places");
  const resData = await responses.json();

  if (!responses.ok) {
    throw new Error("Failed to fetch Users Places!");
  }
  return resData.places;
}

export async function fetchAvailablePlaces() {
  const respones = await fetch("http://localhost:3000/places");
  const resData = await respones.json();

  if (!respones.ok) {
    throw new Error("Failed to fetch DB!");
  }

  return resData.places;
}

export async function updateSelecetedPlaces(places) {
  const responses = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await responses.json();

  return resData.message;
}
