const addHospital = () => {
  var name = document.getElementById("name").value;
  var openTime = document.getElementById("openTime").value;
  var closeTime = document.getElementById("closeTime").value;
  var main = document.getElementById("main").value;
  var secondary = document.getElementById("secondary").value;
  var lat = document.getElementById("lat").value;
  var lon = document.getElementById("lon").value;
  var facilitiesName = document.getElementById("facilitiesName").value;
  var facilitiesPrice = document.getElementById("facilitiesPrice").value;
  var state = document.getElementById("state").value;
  var type = document.getElementById("type").value;

  document.getElementById("submit").innerHTML = "Adding !"

  console.log(name, openTime, closeTime, main, secondary);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: {
      hospital: {
        closeTime: closeTime,
        contact: { main: main, secondary: secondary },
        // facilities: { [facilitiesName]: facilitiesPrice },
        facilitiesName:facilitiesName,
        facilitiesPrice: facilitiesPrice,
        lat: lat,
        lon: lon,
        name: name,
        openTime: openTime,
        state: state,
        type: type,
      },
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://us-central1-project-21-3c016.cloudfunctions.net/enterHospital",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      alert("Hospital Sucessfully Added !");
    })
    .catch((error) => {
      console.log("error", error);
      alert("Hospital not added, please try again !");
    });
};
