
//initilizing socket io -- 1
const socket = io();

//watchposition and marker characteristics
if (navigator.geolocation) { //2
  //watch the postion of the navigator
  navigator.geolocation.watchPosition((postion) => {
    //mark the lan, logn
    const { latitude, longitude } = postion.coords;
    //sending the postion coordinates to backend from frontend
    socket.emit("send-location", { latitude, longitude });
  }, (error) => {
    console.error(error);
  }, { //requirement from instruction file
    enableHighAccuracy: true, //high accuracy
    timeout: 5000, //in ms
    maximumAge: 0 //no cashing -> no data is saved
  });
}

//loading the map into frontend
const map = L.map("map").setView([0, 0], 16); //3,  16 -> zooming scale
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap"
}).addTo(map) //3


//creating empty object markers //4
const marker = {};

//receive location information //6, 5->app.js
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude]); 

  //adding markers //7
  if (marker[id]) {
    //setLatLng - set latitude longitude
    marker[id].setLatLng([latitude, longitude]);
  } else {
    marker[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

// instruction 8 - > marker remove it not exist/disconnect
socket.on("user-disconnect", () => { //9, 8-> app.js(handling disconnect)
  if (marker[id]) {
    map.removeLayer(marker[id]);
    delete marker[id] //delete object,key value
  }
})
