
// const socket = io();
// console.log("hey pritam!");

const socket = io();

// socket.on('connect', () => {
//   console.log('connected to server via socket');
// });

if (navigator.geolocation) {
  //watch the postion of the navigator
  navigator.geolocation.watchPosition((postion) => {
    //mark the lan, logn
    const { latitude, longitude } = postion.coords;
    //sending the postion coordinates to backend
    socket.emit("send-location", { latitude, longitude });
  }, (error) => {
    console.error(error);
  }, {
    enableHighAccuracy: true, //high accuracy
    timeout: 5000, //in ms
    maximumAge: 0 //no cashing -> no saving of data
  });
}

const map = L.map("map").setView([0, 0], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap"
}).addTo(map)


//creating empty object markers
const marker = {};

socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude]);

  //naming markers
  if (marker[id]) {
    //setLatLng - set latitude longitude
    marker[id].setLatLng([latitude, longitude]);
  } else {
    marker[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

socket.on("user-disconnect", () => {
  if (marker[id]) {
    map.removeLayer(marker[id]);
    delete marker[id]
  }
})
