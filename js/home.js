const section_icon = document.querySelectorAll('.project-section')
const iconteste = document.querySelector('#principal')
const card_opt = document.querySelector('#seccondary')


iconteste.addEventListener('mouseenter', (evt) =>{ 
    evt.stopPropagation()
    card_opt.dataset.isactive = true
})

iconteste.addEventListener('mouseleave', (evt) =>{ 
    evt.stopPropagation()
    card_opt.dataset.isactive = false
})

/*section_icon.forEach((icon) => {
    //const project_options = icon.lastElementChild
    icon.addEventListener('mouseenter', (evt) => {
        console.log(evt.target)
        card_opt.dataset.isactive = true
    })
    icon.addEventListener('mouseleave', (evt) =>{
        console.log(evt.target)
        
        //card_opt.dataset.isactive = false 
    })
})*/

