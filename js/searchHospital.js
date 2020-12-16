const searchHospital = () => {
  var lat = document.getElementById("lat").value;
  var lon = document.getElementById("lon").value;
  var state = document.getElementById("state").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: { state: state, lat: lat, lon: lon, count: 3 },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://us-central1-project-21-3c016.cloudfunctions.net/getNearbyHospitals",
    requestOptions
  )
    .then((response) => {
      console.log(response);
      document.getElementById("name").textContent =
        response.result.hospitals[0].name;
      document.getElementById("main").textContent =
        response.result.hospitals[0].contact.main;
      return response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
