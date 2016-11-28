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
