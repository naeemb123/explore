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
            $(".place-info").hide();
            $(".menu-container").show();
        }
    });

    $( ".recommendation-places" ).click(function () {
        $(".recommendation-card").css("bottom", "10%");
    });

    $('#restaurantImg').click(function () {
        showRestaurant_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
    });

    $('#clubImg').click(function () {
        showNightClubs_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
    });

    $('#cinemaImg').click(function () {
        showMovie_Recommendations();
        $(".recommendation-card").css("bottom", "-70%");
        $(".place-info").hide();
        $(".menu-container").show();
    });

    $('#coffeeImg').click(function () {
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
                "<i class='material-icons' style='font-size: 60px; color: #9c27b0;'>face</i><br/>Ben </p>"
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

    });
    
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