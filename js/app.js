jQuery(function($){

    let startBtn = $(".js-start");
    let stopLoop = false;
    let stepDurration = 300;
    let totalItems = $('[data-person^="1-"]').length;
    let totalCycleTime = totalItems * stepDurration;
    let loopInterval = null;

    function runSequence(){
        if (stopLoop) return;

        for(let i = 1; i <= totalItems; i++){
            let element = $(`[data-person="1-${i}"]`);

            setTimeout(function(){
                if (!stopLoop){
                    element.addClass("food");
                }
            }, (i - 1) * stepDurration);

            setTimeout(function(){
                element.removeClass("food");
            }, (i - 1) * stepDurration + stepDurration);
        }
    }

    function startLoop(){
        stopLoop = false;
        clearInterval(loopInterval);
        runSequence();
        loopInterval = setInterval(function(){
            if(stopLoop){
                clearInterval(loopInterval);
            } else {
                runSequence();
            }
        }, totalCycleTime);
    }

    startBtn.on("click", function(){
        startLoop();
    });

});