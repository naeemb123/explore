$(document).ready(function () {

    $( ".recommendation-card" ).draggable({
        axis: "y"
    });

    $(".recommendation-card").click(function () {
        $(".place-info").hide();
        $(".menu-container").show();
        $(".recommendation-card").css("bottom","10%");
    });
    $('.refresh').click(function() {
        location.reload();
    });

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        if(e.touches.length == 2){
            //This means there are two finger move gesture on screen
            googleMapsReference.setOptions({draggable:true});
        }
    }, false);

});

$(document).mouseup(function (e)
{
    var container = $(".recommendation-card");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.css("bottom","-70%");
        $(".recommendation-places").show();
    }
});
