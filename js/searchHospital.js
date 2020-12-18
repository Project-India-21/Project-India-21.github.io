if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);
}

function displayLocationInfo(position) {      
  lon = position.coords.longitude;
  lat = position.coords.latitude;
  document.getElementById("lat").value = lat;
  document.getElementById("lon").value = lon;

  console.log(`longitude: ${ lon } | latitude: ${ lat }`);
}

function searchHospital() {

  document.getElementById("submit").value = "Searching !"

    var state = document.getElementById("state").value;

    var lat = document.getElementById("lat").value;
    var lon = document.getElementById("lon").value;

    var lat;
    var lon;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  console.log(`longitude: ${ lon } | latitude: ${ lat }`);
  
  var raw = JSON.stringify({
    data: { state: state, lat: lat, lon: lon, count: 3 },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var HTML = "";

  fetch(
    "https://us-central1-project-21-3c016.cloudfunctions.net/getNearbyHospitals",
    requestOptions
  )
    .then(async (response) => {
      console.log(typeof response);
      var hospital = await response.json();

      console.log(typeof hospital.result);

      hospital.result.hospitals.forEach((element) => {
        console.log(element.name);
        console.log(element.contact.main);
        console.log(element.openTime);

        var name = element.name;
        var closeTime = element.closeTime;
        var openTime = element.openTime;
        var main = element.contact.main;
        var secondary = element.contact.secondary;
        var facilitiesName = element.facilitiesName;
        var facilitiesPrice = element.facilitiesPrice;
        var type = element.type;
        var dist = element.dist;
        
        HTML += 
        `<div class="col-lg-12">
        <div class="card">
        <div class="list">
          <h2><b>${name}</b></h2>
          <div class="row">
            <div class="col-lg-3">
              <h4><b>Timings</b><br />${openTime} - ${closeTime}</h4>
            </div>
            <div class="col-lg-3">
              <h4>
                <b>Contact Details<br /></b>Main: ${main}<br />Secondary: ${secondary}
              </h4>
            </div>
            <div class="col-lg-3">
              <h4><b>Facilities</b><br />${facilitiesName} - ${facilitiesPrice}</h4>
            </div>
            <div class="col-lg-3">
              <h4><b>Type</b><br />${type}</h4>
            </div>
            <div class="col-lg-12">
              <h4><b>Distance</b><br>${dist} </h4>
            </div>

          </div>
          </div>
          </div>
        </div>
        `

      });

      document.querySelector(".hospitalCard").innerHTML = HTML;
      document.getElementById("submit").style.display = "none";
    })
    .catch((error) => console.log("error", error));
    
}