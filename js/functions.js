$(document).ready(function () {

    $( ".recommendation-card" ).swipe( {
        //Generic swipe handler for all directions
        swipeUp:function(event, direction, distance, duration, fingerCount, fingerData) {
            // $(".place-info").hide();
            // $(".menu-container").show();
            // $(".recommendation-places").text("You swiped " + direction );
            $(".recommendation-card").css("bottom", "10%");
        },
        swipeDown:function(event, direction, distance, duration, fingerCount, fingerData) {
            // $(".place-info").hide();
            // $(".menu-container").show();
            // $(".recommendation-places").text("You swiped " + direction );
            $(".recommendation-card").css("bottom", "-70%");
            setTimeout(afterCss, 100);
        }
    });

    $( ".profile-window" ).swipe( {
        //Generic swipe handler for all directions
        swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
            // $(".place-info").hide();
            // $(".menu-container").show();
            // $(".recommendation-places").text("You swiped " + direction );
            $('.profile-window').css('left','100%');
        }
    });

    function afterCss() {
        $(".place-info").hide();
        $(".menu-container").show();
    }

    $( ".recommendation-places" ).click(function () {
        $(".recommendation-card").css("bottom", "10%");
    });

    $('#restaurantImg').click(function () {
        showRestaurant_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
        $(".rest-button").show();
        $(".my-location").show();
    });

    $('.my-location').click(function () {
        initMap();
        $(".my-location").hide();
        $('.rest-button').hide();
    });

    $('.top').click(function () {
        showRecommendations();
        $(".my-location").show();
    });

    $('.near').click(function () {
        showRestaurant_Recommendations();
        $(".my-location").show();
    });

    $('#clubImg').click(function () {
        showNightClubs_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
        $(".rest-button").show();
        $(".my-location").show();
    });

    $('#cinemaImg').click(function () {
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: myLoc,
            radius: 500,
            type: ['movie_theater']
        }, callback4);
        showMovie_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
    });

    $('#coffeeImg').click(function () {
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: myLoc,
            radius: 1000,
            type: ['cafe']
        }, callback3);
        showCafe_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
    });

    $(".group-icon").click(function () {
        $(".menu-container").slideUp("slow",function () {
            $(".add-friends").show();
        });
    });

    $(".friend-input").keypress(function(e) {
        if(e.which == 13) {
            $("#searched-friend").append(
                "<p style='margin-left: 20px; margin-top: 20px'>" +
                "<i class='material-icons' style='font-size: 60px; color: #9c27b0;'>face</i><br/>Nayhall</p>"
            );
        }
    });

    $(".friend-input").focusin(function () {
        $(".list-of-friends").hide();
        $(".group-recent-text").hide();
    });

    $(".friend-input").focusout(function () {
        $(".list-of-friends").show();
        $(".group-recent-text").show();
    });

    $(".friend-icon").click(function () {
        $(this).toggleClass("friend-icon-clicked");
    });

    $(".added-friends").click(function () {
        $(".add-friends").hide();
        $(".menu-container").slideDown("slow");
        $(".group-div").html(
            "<p class='friend-icon' style='float: left'>" +
            "<i class='material-icons' style='font-size: 60px; color: #9c27b0;'>face</i><br/>Ben </p>"+
            "<p class='friend-icon' style='float: left'>" +
            "<i class='material-icons' style='font-size: 60px;'>add_circle_outline</i><br/>Add More</p>"
        );
    });

    $(".profile-button").click(function () {
        $('.profile-window').css('left','0%');
    });

    $(".back-button").click(function () {
        $('.profile-window').css('left','100%');
    });

    $(".like-btn").click(function () {
        $(".like-window").hide();
    });

    // $("#get-points").click(function () {
    //     var start = new Date;
    //     setInterval(function() {
    //         $('#get-points-text').text(Math.round((start - new Date) / 1000, 0) + " Seconds");
    //     }, 1000);
    // });
});

// $(document).mouseup(function (e)
// {
//     var container = $(".recommendation-card");
//     if (!container.is(e.target) // if the target of the click isn't the container...
//         && container.has(e.target).length === 0) // ... nor a descendant of the container
//     {
//         container.css("bottom","-70%");
//         $(".recommendation-places").show();
//     }
// });