$(document).ready(function () {
    $(".recommendation-card").click(function () {
        $(".recommendation-card").css("bottom","15%");
    });
});

$(document).mouseup(function (e)
{
    var container = $(".recommendation-card");
    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.css("bottom","-60%");
        $(".recommendation-card").html(
            "<h1>Recommended Places</h1>"
        );
    }
});