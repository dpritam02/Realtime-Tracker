![tracker photo](https://github.com/user-attachments/assets/27600eb4-8e82-45fe-a4f2-a1a6d02a164d)

RoadMap of our project----------------------------------------------------------------
1. Check if the browser supports geolocation.
2. Set options for high accuracy, a 5—second timeout and no caching. 
3. Use watchPosition to track the user location continuously.
4. Emit latitude and longitude via a socket with "send—location". Log    any errors to the console
5. Initialize a map centered at coordinates (0, e) with a zoon level of 15 using Leaflet. Add OpenStreetMap tiles to the map.
6. Create an empty object markers.
7. When receiving location data via the socket, extract id, latitude, and longitude, and center the map on the new coordinates.
8. If a marker for the id exists, update its position, otherwise, create a new marker at the given coordinates and add it to the map. when
a user disconnects, remove their marker from the map and delete it from markers.

All thanks to sheryians coding school youtube channel.
