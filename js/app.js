jQuery(function($){

    let progressTimer;
    let currentVal = 0;

    function initBars(group){
        group.find(".progressbar").progressbar({ value: 0 });
        group.find(".progressbar2").progressbar({ value: 70 });
    }

    initBars($(".group").first());

    function startLoop(group){
        var minVal = 0;
        var maxVal = 100;
        currentVal = minVal;
        var step = 1;
        var direction = 1;
        var speed = 30;

        var bar = group.find(".progressbar");

        clearInterval(progressTimer);

        progressTimer = setInterval(function(){
            currentVal += (step * direction);

            if (currentVal >= maxVal){
                currentVal = maxVal;
                direction = -1;
                bar.addClass("is-reversing");
            } else if (currentVal <= minVal){
                currentVal = minVal;
                direction = 1;
                bar.removeClass("is-reversing");
            }

            bar.progressbar("value", currentVal);
        }, speed);
    }

    $(document).on("click", ".js-start", function(e){
        e.stopPropagation();
        let currentGroup = $(this).closest(".group");
        startLoop(currentGroup);
        $(this).hide();
    });

    $(document).on("click", function(){
        if (progressTimer){
            clearInterval(progressTimer);
            progressTimer = null;
            if (currentVal >= 70 && currentVal <= 80){
                alert("winner");
                let newGroup = $(".group").first().clone();
                newGroup.find(".progressbar", ".progressbar2").removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all is-reversing")
                .removeAttr("role aria-valuemin aria-valuemax aria-valuenow").empty();

                newGroup.find(".js-start").show();
                newGroup.insertAfter(".group:last");
                initBars(newGroup);
            } else {
                alert("loser");
                $(".js-start").last().show();
            }
        }
    });

});