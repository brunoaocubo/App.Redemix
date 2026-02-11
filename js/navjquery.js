document.addEventListener("DOMContentLoaded", function(){
    $("#nav-placeholder").load("../www/nav.html", function(){
        const sections = document.querySelectorAll('.project-section')
        
        sections.forEach((section) => {
            const option = section.querySelector('.projects-options')
            let closerTimer;

            const openMenu = ()=>{
                clearTimeout(closerTimer)
                document.querySelectorAll('.projects-options').forEach((opt) => {
                    if(opt != option){
                        opt.setAttribute('data-isactive', false)
                    }
                })
                option.setAttribute('data-isactive', true)
            }

            const startCloserTimer = ()=>{
                closerTimer = setTimeout(() => {
                    option.setAttribute('data-isactive', false)
                }, 500)
            }

            section.addEventListener('mouseenter', openMenu)
            section.addEventListener('mouseleave', startCloserTimer)
            option.addEventListener('mouseenter', () =>{
                clearTimeout(closerTimer)
            })
            option.addEventListener('mouseleave', startCloserTimer)
            
        })
    }) 
})