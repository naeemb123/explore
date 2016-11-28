// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var markers = [];
var locations = [];

function initMap() {

    var myLoc = {lat: 55.873469, lng: -4.292006};

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLoc,
        zoom: 16,
        disableDefaultUI: true,
        gestureHandling: 'auto',
        clickableIcons: false
    });

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 180,
        type: ['movie_theater']
    }, callback2);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 180,
        type: ['bar']
    }, callback3);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 180,
        type: ['restaurant']
    }, callback1);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: myLoc,
        radius: 180,
        type: ['cafe']
    }, callback4);

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
    google.maps.event.addDomListener(window, 'load', initMap);

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
            createMarker(results[i],"movie_theater");
        }
    }
}
function callback3(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"night_clubs");
        }
    }
}
function callback4(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i],"cafe");
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



    if(locations.indexOf(place.geometry.location) == -1) {
        locations.push(place.geometry.location);
    } else {
        return false;
    }


    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        // icon: icons[type].icon
    });

    markers.push(marker);
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
                "<a class='btn get-directions' href='#'><i class='material-icons icon-direction'>directions</i><br/><p class='text-direction' >Get Direction</p></a>" +
                "</div>"
            );
            $(".place-info").show();
        }
        // infowindow.setContent(place.name);
        // infowindow.open(map, this);
    });

}
