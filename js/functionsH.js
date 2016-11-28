$(document).ready(function () {
    var $elem = $('.recommendation-card');
    console.log($elem.height());
    console.log($('.recommendation-card').height());
    console.log($elem.css('top'));

    $( ".recommendation-card" ).draggable({
        scroll: false,
        revert: 'invalid',
        stack: false,
        cursor: "pointer",
        axis: "y"
    });
    $( "#droppable" ).droppable({
        drop: function( event, ui ) {
            var $this = $(this);
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $this,
                using: function(pos) {
                    $(this).velocity("slideUp", { delay: 0, duration: 500, mobileHA: true });
                }
            });
        }
    });
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
