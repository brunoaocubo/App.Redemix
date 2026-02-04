document.addEventListener("DOMContentLoaded", function(){
    $("#nav-placeholder").load("../www/nav.html", function(){

        $('.project-section').on({
            mouseenter: function(){
                $(this).children(0).attr("data-isactive", true)
            }
            ,
            mouseleave: function(){
                $(this).children(0).attr("data-isactive", false)
            }
        })
    }) 
})