jQuery(function($){

    var player = $(".js-player");
    var friend = $(".js-friend");
    var rabbithole = $("#game");

    // Get the player parent list index
    var currentIndex = player.parent().index();

    // Random num generation 1-10 for random list amounts
    var randomNum = Math.floor(Math.random() * 9) + 2;

    $("#startBtn").on("click", function(){
        for (var i = 0; i <= randomNum; i++){
            // Create new path and save the list to a var
            var newLi = $("<li></li>");

            // Append the path to the game area
            $(rabbithole).append(newLi);

            // Append the friend to the newest list
            newLi.append(friend);
        }
        $(this).hide();
    });

    $(document).on("keydown", function(e){
        switch (e.key){
            case "ArrowUp":
                e.preventDefault();
                moveStep(-1); // Backward
                break;
            case "ArrowDown":
                e.preventDefault();
                moveStep(1); // Forward
                break;
        }
    });

    $(document).on("swipeup", function(){
        moveStep(-1);
    });
});