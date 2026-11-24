jQuery(function($){

    let progressTimer;
    let currentVal = 0;
    let randomNum = 0;
    let winMargin = 15;

    function getRandomTarget(){
        let maxStart = 95 - winMargin;
        return Math.floor(Math.random() * (maxStart - 10 + 1)) + 10;
    }

    function initBars(group){
        randomNum = getRandomTarget();
        let winEnd = randomNum + winMargin;
        group.find(".progressbar").progressbar({ value: 0 });
        group.find(".progressbar2").progressbar({ value: randomNum }).css({
            "--win-start": randomNum + "%",
            "--win-end" : winEnd + "%"
        });
    }

    initBars($(".group").first());

    function startLoop(group){
        var minVal = 0;
        var maxVal = 100;
        currentVal = minVal;
        var step = 1;
        var direction = 1;
        var speed = 40;

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
            if (currentVal >= randomNum && currentVal <= randomNum + winMargin){
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