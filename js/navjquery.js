console.log("Navjquery.js Carregada")
document.addEventListener("DOMContentLoaded", function(){
    console.log("Evento DOMContentLoaded do Navjquery.js Carregado")

    $("#nav-placeholder").load("../www/nav.html", function(){
        console.log("Nav.html do Navjquery.js Carregado")

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