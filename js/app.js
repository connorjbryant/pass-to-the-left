jQuery(function($){

    let startBtn = $(".js-start");
    let subitem = $(".subitem");

    startBtn.on("click", function(){
        subitem.each(function(){
            let person = $(this).data("person");

            $(this).siblings(person).each(function(index){
                var element = $(this);

                setTimeout(function(){
                    element.toggleClass("food");
                }, index * 300);
            });
        });
    });

});