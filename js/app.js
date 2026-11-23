jQuery(function($){

    let startBtn = $(".js-start");

    $("#progressbar").progressbar({
        value: 0
    });

    function startLoop(){
        var minVal = 0;
        var maxVal = 100;
        var currentVal = minVal;
        var step = 1;
        var direction = 1;
        var speed = 30;

        var bar = $("#progressbar").progressbar({
            value: currentVal
        });

        setInterval(function(){
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

    startBtn.on("click", function(){
        startLoop();
        $(this).hide();
    });

});