var map;
var infoWindow;
var service;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.8642, lng: -4.2518},
    zoom: 15,
    styles: [{
      stylers: [{ visibility: 'simplified' }]
    }, {
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }]
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: 'food'
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, person_location_history; person_location_history = location_history_of_recommenders[i]; i++) {
    for (var j = 0, result; result = person_location_history[j]; j++){
        addMarker(result);
    }
  }
}

function addMarker(place) {
  // console.log(JSON.stringify(place));
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'images/restaurant-marker.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(30, 51)
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(map, marker);
    });
  });
}
