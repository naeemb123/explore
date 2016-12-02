// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var myLoc = {lat: 55.875550, lng: -4.292106};
var nearLoc = {lat: 55.8755843, lng: -4.2941678};
var restaurant_markers = [];
var night_clubs_markers = [];
var cafe_markers = [];
var movie_theater_markers = [];
var timer = 5;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLoc,
        zoom: 19,
        disableDefaultUI: true,
        gestureHandling: 'auto',
        clickableIcons: false
    });

    infowindow = new google.maps.InfoWindow();

    var location = new google.maps.Marker({
        position: myLoc,
        icon: "images/icons/myLocation1.png",
        map: map
    });

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 250,
        type: ['restaurant']
    }, callback1);

    // var service = new google.maps.places.PlacesService(map);
    // service.nearbySearch({
    //     location: myLoc,
    //     radius: 1000,
    //     type: ['night_club']
    // }, callback2);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 100,
        type: ['cafe']
    }, callback3);

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
            createMarker(results[i],"bar");
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
        bar: {
            icon: 'images/icons/icon-club.png',
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
        size: new google.maps.Size(42, 40),
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
                "<a class='btn get-directions' id='get-points' href='#'><i class='material-icons icon-points'>stars</i><br/><p class='text-direction' id='get-points-text' style='margin-left: -25px' >Claim Points</p></a>" +
                "</div>"
            );
            $("#get-points").click(function () {
                itimer = setInterval(function() {
                    $('#get-points-text').text(timer-- + " Seconds");
                    if(timer == 0){
                        $('#get-points-text').css("margin-left","-50px");
                        $('#get-points-text').text("100 Points Claimed");
                        $(".like-window").show();
                        timer = 5;
                        clearTimeout(itimer);
                    }
                }, 1000);
            });
        }
        $(".place-info").show();
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });

}


function showRestaurant_Recommendations(){
    map.setZoom(16);
    map.setCenter({lat: 55.875469, lng: -4.292006});
    clearRestuarantsFromMap();
    for (var i = 0; i < 5; i++ ) {
        restaurant_markers[i].setMap(map);
    }
}


// Removes the markers from the map
function clearRestuarantsFromMap(){
    for (var i = 0; i < restaurant_markers.length; i++ ) {
        restaurant_markers[i].setMap(null);
    }
    for (var i = 0; i < cafe_markers.length; i++ ) {
        cafe_markers[i].setMap(null);
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
    map.setZoom(15);
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 1000,
        type: ['night_club']
    }, callback2);
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

