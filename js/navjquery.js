document.addEventListener("DOMContentLoaded", function(){
    $("#nav-placeholder").load("../www/nav.html", function(){
        const section = document.querySelectorAll('.project-section')
        const options = document.querySelectorAll('.projects-options')
        

        section.forEach((project) => {
            project.addEventListener('click', function(){
                const filho = $(this).find('.projects-options')
                if(filho.attr('data-isactive') === false){
                    filho.attr('data-isactive', true)
                }
                else{
                    filho.attr('data-isactive', false)
                }
                console.log(filho)
            })
        })
        
        options.forEach((project) => {
            project.addEventListener('mouseleave', function(){
                project.setAttribute('data-isactive', false)
            })
        })
        
        /*
        $('.project-section').on({
            mouseenter: function(evt){
                if(evt.target != this)
                {
                    return;
                }
                
                $(this).children($)
            }
            ,
            mouseleave: function(evt){
                if(evt.target != this)
                {
                    return;
                }
                //console.log($(this).find('.project-options'))
        
            }
        })*/
    }) 
})