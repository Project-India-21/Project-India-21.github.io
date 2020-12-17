// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//     var lat = position.coords.latitude;  
//     var lon = position.coords.longitude;
//   } else { 
//     alert("Geolocation is not supported by this browser.");
//   }
// }

//   console.log(position.coords.latitude, position.coords.longitude);


function searchHospital() {

  // var lat = document.getElementById("lat").value;
  // var lon = document.getElementById("lon").value;
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
    .then(async (response) => {
      console.log(typeof (response));
      var hospital = await response.json();

      console.log(typeof (hospital.result));

      hospital.result.hospitals.forEach(element => {
        console.log(element.name);
        console.log(element.contact.main);
        console.log(element.openTime);
        
        
      });

    })
    .catch((error) => console.log("error", error));
}