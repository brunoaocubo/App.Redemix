document.addEventListener("DOMContentLoaded", function(){ 
    fetch("../www/nav.html")
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao carregar a navbar')
        }
        return response.text()
    })
    .then(data => {
        document.querySelector('#nav-placeholder').innerHTML = data

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

        const btn_nav_hide = document.querySelector('#nav-onoff')
        const nav = document.querySelector('nav')
        const main = document.querySelector('main')

        btn_nav_hide.addEventListener('click', (() => {
            nav.setAttribute('data-isactive', true)
        }))

        main.addEventListener('click', (() => {
            if(window.innerWidth <= 600){
                nav.setAttribute('data-isactive', false)

            }
        }))

        window.addEventListener('resize', (evt) => {
            if(evt.target.innerWidth >= 601){
                nav.setAttribute('data-isactive', true)
            }
        })
    })
    .catch(error => console.error('Erro:', error))
})