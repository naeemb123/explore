$(document).ready(function () {
    $(".recommendation-card").click(function () {
        $(".recommendation-card").html(
          "<h1 class='recommendation-places' >Recommended Places</h1>" +
          "  <ul>" +
              "<li><a href='#'><img id='restaurantImg' src='images/restaurant-bg.png'></a</li>" +
              "<li><a href='#'><img id='clubImg' src='images/club.png'></a></li>" +
              "<li><a href='#'><img id='cinemaImg' src='images/cinema-bg.png'></a></li>" +
              "<li><a href='#'><img id='coffeeImg' src='images/coffee-bg.png'></a></li>" +
            "</ul>"
        );
        $(".recommendation-card").css("bottom","10%");
    });
});

$(document).mouseup(function (e)
{
    var container = $(".recommendation-card");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.css("bottom","-70%");
        $(".recommendation-card").html(
            "<h1 class='recommendation-places'>Recommended Places</h1>"
        );
    }
});
