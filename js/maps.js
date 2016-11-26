// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;

function initMap() {
    var pyrmont = {lat: 55.8642, lng: -4.2518};

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 17
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: "images/restaurant-marker.png"
    });

    google.maps.event.addListener(marker, 'click', function() {
        $(".recommendation-card").css("bottom","15%");
        $(".recommendation-card").html(
            ""
        );
        if(place.photos){
            $(".recommendation-card").append(
                "<div class='image-wrapper'>" +
                "<img class='place-image' src='"+place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 300})+"'/>" +
                "</div>" +
                "<h1 class='place-name'>"+place.name+"</h1>"

            );
        }
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });

}
