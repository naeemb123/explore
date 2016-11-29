// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var myLoc = {lat: 55.875469, lng: -4.292006};
var nearLoc = {lat: 55.8755843, lng: -4.2941678};
var glasgowLoc = {lat: 55.864237, lng: -4.251806}
var option = "city";
var restaurant_markers = [];
var night_clubs_markers = [];
var cafe_markers = [];
var movie_theater_markers = [];

var recommender_restaurants = {}
var recommender_cafe = {}
var recommender_night_clubs = {}
var recommender_cinemas = {}

var recommender1 = {}
var recommender2 = {}
var recommender3 = {}
var recommender4 = {}
var recommender5 = {}


var list_of_locations = []


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: glasgowLoc,
        zoom: 18,
        disableDefaultUI: true,
        gestureHandling: 'auto',
        clickableIcons: false
    });

    infowindow = new google.maps.InfoWindow();
    //pointers
    var location = new google.maps.Marker({
        position: myLoc,
        icon: "images/icons/myLocation1.png",
        map: map
    });

    var nearLoc = new google.maps.Marker({
        position: nearLoc,
        icon: "images/icons/icon-coffee.png",
        map: map
    });

    showNearBy(nearLoc);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: glasgowLoc,
        radius: 10000,
        type: ['restaurant']
    }, callback1);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: glasgowLoc,
        radius: 1000,
        type: ['night_club']
    }, callback2);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: glasgowLoc,
        radius: 1000,
        type: ['cafe']
    }, callback3);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: glasgowLoc,
        radius: 1000,
        type: ['movie_theater']
    }, callback4);

    var marker2 = new google.maps.Marker({
        position: {lat: 55.874550, lng: -4.293224},
        icon: "images/cluster-icon-15.png",
        map: map
    });

    marker2.addListener('click', function() {
        map.setZoom(19);
        map.setCenter({lat: 55.8747404, lng: -4.2931500});
        this.setMap(null);
    });

}

function showNearBy(marker) {
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
        }
        $(".place-info").show();
});
}

function callback1(results, status) {
  var counter = 1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          if (results.length > 9 && i<10){
            if (i<2) recommender1["restaurant"+counter++] = results[i];
            else if (i<4 && i>1) recommender2["restaurant"+counter++] = results[i];
            else if (i<6 && i>3) recommender3["restaurant"+counter++] = results[i];
            else if (i<8 && i>5) recommender4["restaurant"+counter++] = results[i];
            else if (i<10 && i>7) recommender5["restaurant"+counter++] = results[i];
            if( counter == 3 ) counter = 1;
          }

          if (option == "nearby"){
              createMarker(results[i],"restaurant");
          }
        }

        if (results.length < 9){
          recommender1["restaurant1"] = results[1];recommender1["restaurant2"] = results[2];
          recommender2["restaurant1"] = results[0];recommender2["restaurant2"] = results[1];
          recommender3["restaurant1"] = results[2];recommender3["restaurant2"] = results[0];
          recommender4["restaurant1"] = results[2];recommender4["restaurant2"] = results[0];
          recommender5["restaurant1"] = results[0];recommender5["restaurant2"] = results[1];
        }
        if (option == "city"){
          createMarker(recommender1['restaurant1'], "restaurant");
          createMarker(recommender1['restaurant2'], "restaurant");
          createMarker(recommender2['restaurant1'], "restaurant");
          createMarker(recommender2['restaurant2'], "restaurant");
          createMarker(recommender3['restaurant1'], "restaurant");
          createMarker(recommender3['restaurant2'], "restaurant");
          createMarker(recommender4['restaurant1'], "restaurant");
          createMarker(recommender4['restaurant2'], "restaurant");
          createMarker(recommender5['restaurant1'], "restaurant");
          createMarker(recommender5['restaurant2'], "restaurant");
        }
    }
}
function callback2(results, status) {
    var counter = 1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            if (results.length > 9 && i<10){
              if (i<2) recommender1["nightClubs"+counter++] = results[i];
              else if (i<4 && i>1) recommender2["nightClubs"+counter++] = results[i];
              else if (i<6 && i>3) recommender3["nightClubs"+counter++] = results[i];
              else if (i<8 && i>5) recommender4["nightClubs"+counter++] = results[i];
              else if (i<10 && i>7) recommender5["nightClubs"+counter++] = results[i];
              if (counter == 3) counter=1;
            }
            if (option == "nearby"){
              createMarker(results[i],"bar");
            }
        }
        if (results.length < 9){
          recommender1["nightClubs1"] = results[1];recommender1["nightClubs2"] = results[2];
          recommender2["nightClubs1"] = results[0];recommender2["nightClubs2"] = results[1];
          recommender3["nightClubs1"] = results[2];recommender3["nightClubs2"] = results[0];
          recommender4["nightClubs1"] = results[2];recommender4["nightClubs2"] = results[0];
          recommender5["nightClubs1"] = results[0];recommender5["nightClubs2"] = results[1];
        }

        if (option == "city"){
          createMarker(recommender1['nightClubs1'], "bar");
          createMarker(recommender1['nightClubs2'], "bar");
          createMarker(recommender2['nightClubs1'], "bar");
          createMarker(recommender2['nightClubs2'], "bar");
          createMarker(recommender3['nightClubs1'], "bar");
          createMarker(recommender3['nightClubs2'], "bar");
          createMarker(recommender4['nightClubs1'], "bar");
          createMarker(recommender4['nightClubs2'], "bar");
          createMarker(recommender5['nightClubs1'], "bar");
          createMarker(recommender5['nightClubs2'], "bar");
        }
    }
}
function callback3(results, status) {
    var counter = 1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          if (results.length > 9 && i<10){
            if (i<2) recommender1["cafe"+counter++] = results[i];
            else if (i<4 && i>1) recommender2["cafe"+counter++] = results[i];
            else if (i<6 && i>3) recommender3["cafe"+counter++] = results[i];
            else if (i<8 && i>5) recommender4["cafe"+counter++] = results[i];
            else if (i<10 && i>7) recommender5["cafe"+counter++] = results[i];
            if (counter == 3) counter = 1;
          }
          if (option == "nearby"){
            createMarker(results[i],"cafe");
          }
        }

        if (results.length < 9){
          recommender1["cafe1"] = results[1];recommender1["cafe2"] = results[2];
          recommender2["cafe1"] = results[0];recommender2["cafe2"] = results[1];
          recommender3["cafe1"] = results[2];recommender3["cafe2"] = results[0];
          recommender4["cafe1"] = results[2];recommender4["cafe2"] = results[0];
          recommender5["cafe1"] = results[0];recommender5["cafe2"] = results[1];
        }

        if (option == "city"){
          createMarker(recommender1['cafe1'], "cafe");
          createMarker(recommender1['cafe2'], "cafe");
          createMarker(recommender2['cafe1'], "cafe");
          createMarker(recommender2['cafe2'], "cafe");
          createMarker(recommender3['cafe1'], "cafe");
          createMarker(recommender3['cafe2'], "cafe");
          createMarker(recommender4['cafe1'], "cafe");
          createMarker(recommender4['cafe2'], "cafe");
          createMarker(recommender5['cafe1'], "cafe");
          createMarker(recommender5['cafe2'], "cafe");
        }
    }
}
function callback4(results, status) {
    var counter = 1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          if (results.length > 9 && i<10){
            if (i<2) recommender1["movieTheatre"+counter++] = results[i];
            else if (i<4 && i>1) recommender2["movieTheatre"+counter++] = results[i];
            else if (i<6 && i>3) recommender3["movieTheatre"+counter++] = results[i];
            else if (i<8 && i>5) recommender4["movieTheatre"+counter++] = results[i];
            else if (i<10 && i>7) recommender5["movieTheatre"+counter++] = results[i];
            if (counter == 3) counter=1;
          }
          if (option == "nearby"){
            createMarker(results[i],"movie_theater");
          }
        }

        if (results.length < 9){
          recommender1["movieTheatre1"] = results[1];recommender1["movieTheatre2"] = results[2];
          recommender2["movieTheatre1"] = results[0];recommender2["movieTheatre2"] = results[1];
          recommender3["movieTheatre1"] = results[2];recommender3["movieTheatre2"] = results[0];
          recommender4["movieTheatre1"] = results[2];recommender4["movieTheatre2"] = results[0];
          recommender5["movieTheatre1"] = results[0];recommender5["movieTheatre2"] = results[1];
        }

        if (option == "city"){
          createMarker(recommender1['movieTheatre1'], "movie_theater");
          createMarker(recommender1['movieTheatre2'], "movie_theater");
          createMarker(recommender2['movieTheatre1'], "movie_theater");
          createMarker(recommender2['movieTheatre2'], "movie_theater");
          createMarker(recommender3['movieTheatre1'], "movie_theater");
          createMarker(recommender3['movieTheatre2'], "movie_theater");
          createMarker(recommender4['movieTheatre1'], "movie_theater");
          createMarker(recommender4['movieTheatre2'], "movie_theater");
          createMarker(recommender5['movieTheatre1'], "movie_theater");
          createMarker(recommender5['movieTheatre2'], "movie_theater");
        }
    }
}

function createMarker(place,type) {

    var icons = {
        restaurant: {
            icon: 'images/icons/icon-food.png'
        },
        bar: {
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
    else if (type == "bar"){
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
        } else {
            $(".place-info").html(
                "<div class='image-wrapper'>" +
                "<img class='place-image' src='images/no-image.jpg'/>" +
                "</div>" +
                "<h1 class='place-name'>"+place.name+"</h1>"+
                "<div class='rating'>"+
                "<span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>"+
                "</div>"+
                "<p style='text-align: justify; padding: 10px'>Description of the place from Google Place API"+
                " This is an amazing place for lunch"+
                " Ranked in top 10 of Glasgow restaurants."+
                " Some other nice words about the place.</p>"+
                "<a class='btn get-directions' href='#'><i class='material-icons icon-direction'>stars</i><br/><p class='text-direction' style='margin-left: -14px' >Check In</p></a>" +
                "</div>"
            );
        }
        $(".place-info").show();
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });
}


var showRestaurant_Recommendations = function(){
    clearMarkers()
    for (var i = 0; i < restaurant_markers.length; i++ ) {
        // console.log(JSON.stringify(restaurant_markers[i]));
        restaurant_markers[i].setMap(map);
    }
}

var showCafe_Recommendations = function(){
    clearMarkers();
    for (var i = 0; i < cafe_markers.length; i++ ) {
        console.log(cafe_markers[i]);
        cafe_markers[i].setMap(map);
    }
}

var showMovie_Recommendations = function(){
    clearMarkers();
    for (var i = 0; i < movie_theater_markers.length; i++ ) {
        console.log(movie_theater_markers[i]);
        movie_theater_markers[i].setMap(map);
    }
}

var showNightClubs_Recommendations = function(){
    clearMarkers();
    for (var i = 0; i < night_clubs_markers.length; i++ ) {
        console.log(night_clubs_markers[i]);
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

console.log(recommender1);
console.log("++++++++");
console.log(recommender2);
console.log("++++++++");
console.log(recommender3);
console.log("++++++++");
console.log(recommender4);
console.log("++++++++");
console.log(recommender5);
console.log("++++++++");
