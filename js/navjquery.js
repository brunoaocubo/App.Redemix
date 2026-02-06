document.addEventListener("DOMContentLoaded", function(){
    $("#nav-placeholder").load("../www/nav.html", function(){
        const section = document.querySelectorAll('.project-section')
        const options = document.querySelectorAll('.projects-options')
        let timeout = null;

        section.forEach((project) => {
            project.addEventListener('click', function(){
                options.forEach((options) => {
                    options.setAttribute('data-isactive', false)
                })
                const filho = $(this).find('.projects-options')
                filho.attr('data-isactive', true)       
            })

            project.addEventListener('mouseleave', function(){
                const filho = $(this).find('.projects-options')
                
                timeout = setTimeout(()=>{filho.attr('data-isactive', false) }, 250)
            })
        })
        
        options.forEach((project) => {
            project.addEventListener('mouseenter', function(){
                project.setAttribute('data-isactive', true)
                clearTimeout(timeout)
            })
            project.addEventListener('mouseleave', function(){
                setTimeout(() => {project.setAttribute('data-isactive', false)}, 500)
                
            })
        })
    }) 
})