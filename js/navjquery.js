document.addEventListener("DOMContentLoaded", function(){
    $("#nav-placeholder").load("../www/nav.html", function(){
        const sections = document.querySelectorAll('.project-section')
        const options = document.querySelectorAll('.projects-options')

        sections.forEach((section) => {
            section.addEventListener('mouseenter', function(e){
                e.stopPropagation()

                options.forEach((option) => {
                    option.setAttribute('data-isactive', false)
                })
                
                const filho = $(this).find('.projects-options')
                filho.attr('data-isactive', true)       
            })
        })
        
        options.forEach((option) => {
            option.addEventListener('mouseenter', function(){
                setTimeout((option.setAttribute('data-isactive', true)), 500)
            })
            option.addEventListener('mouseleave', function(){
                setTimeout(() => {option.setAttribute('data-isactive', false)}, 500)
            })
        })
    }) 
})