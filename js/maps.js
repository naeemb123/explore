// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var myLoc = {lat: 55.873469, lng: -4.292006};
var restaurant_markers = [];
var night_clubs_markers = [];
var cafe_markers = [];
var movie_theater_markers = [];

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLoc,
        zoom: 17,
        disableDefaultUI: true,
        gestureHandling: 'auto',
        clickableIcons: false
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 500,
        type: ['restaurant']
    }, callback1);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 500,
        type: ['night_clubs']
    }, callback2);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 500,
        type: ['cafe']
    }, callback3);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 500,
        type: ['movie_theater']
    }, callback4);
}

function callback1(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"restaurant");
        }
    }
}
function callback2(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"night_clubs");
        }
    }
}
function callback3(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"cafe");
        }
    }
}
function callback4(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"movie_theater");
        }
    }
}

function createMarker(place,type) {

    var icons = {
        restaurant: {
            icon: 'images/icons/icon-food.png'
        },
        night_clubs: {
            icon: 'images/icons/icon-club.png'
        },
        cafe: {
            icon: 'images/icons/icon-coffee.png'
        },
        movie_theater: {
            icon: 'images/icons/icon-movie.png'
        }
    };

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: icons[type].icon,
        type: type
    });
    if (type == "restaurant"){
      restaurant_markers.push(marker);
    }
    else if (type == "night_clubs"){
      night_clubs_markers.push(marker);
    }
    else if (type == "cafe"){
      cafe_markers.push(marker);
    }
    else if (type == "movie_theater"){
      movie_theater_markers.push(marker);
    }

    google.maps.event.addListener(marker, 'click', function() {
        $(".recommendation-card").css("bottom","10%");
        $(".menu-container").hide();
        if(place.photos){
            $(".place-info").html(
                "<div class='image-wrapper'>" +
                "<img class='place-image' src='"+place.photos[0].getUrl({'maxWidth': 1000, 'maxHeight': 300})+"'/>" +
                "</div>" +
                "<h1 class='place-name'>"+place.name+"</h1>"+
                "<div class='rating'>"+
                "<span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>"+
                "</div>"+
                "<p style='text-align: justify; padding: 10px'>Description of the place from Google Place API"+
                " This is an amazing place for lunch"+
                " Ranked in top 10 of Glasgow restaurants."+
                " Some other nice words about the place.</p>"+
                "<a class='btn get-directions' href='#'><i class='material-icons icon-direction'>directions</i><br/><p class='text-direction' >Get Direction</p></a>" +
                "</div>"
            );
            $(".place-info").show();
        }
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });

}


var showRestaurant_Recommendations = function(){
  clearMarkers();
  for (var i = 0; i < restaurant_markers.length; i++ ) {
    restaurant_markers[i].setMap(map);
  }
}

var showCafe_Recommendations = function(){
  clearMarkers();
  for (var i = 0; i < cafe_markers.length; i++ ) {
    cafe_markers[i].setMap(map);
  }
}

var showMovie_Recommendations = function(){
  clearMarkers();
  for (var i = 0; i < movie_theater_markers.length; i++ ) {
    movie_theater_markers[i].setMap(map);
  }
}

var showNightClubs_Recommendations = function(){
  clearMarkers();
  for (var i = 0; i < night_clubs_markers.length; i++ ) {
    night_clubs_markers[i].setMap(map);
  }
}

// Removes the markers from the map
var clearMarkers = function(){
  clearRestuarantsFromMap();
  clearCafesFromMap();
  clearMovieFromMap();
  clearClubbingFromMap();
}

var clearRestuarantsFromMap = function(){
  for (var i = 0; i < restaurant_markers.length; i++ ) {
    restaurant_markers[i].setMap(null);
  }
}

var clearCafesFromMap = function (){
  for (var i = 0; i < cafe_markers.length; i++ ) {
    cafe_markers[i].setMap(null);
  }
}

var clearMovieFromMap = function (){
  for (var i = 0; i < movie_theater_markers.length; i++ ) {
    movie_theater_markers[i].setMap(null);
  }
}

var clearClubbingFromMap = function(){
  for (var i = 0; i < night_clubs_markers.length; i++ ) {
    night_clubs_markers[i].setMap(null);
  }
}
