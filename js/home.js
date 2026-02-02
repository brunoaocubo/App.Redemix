const section_icon = document.querySelectorAll('.project-section')

section_icon.forEach((icon) => {
    const project_options = icon.lastElementChild
    icon.addEventListener('mouseenter', (evt) => {
        evt.stopPropagation()
        project_options.dataset.isactive = true
    })
    icon.addEventListener('mouseleave', (evt) =>{
        evt.stopPropagation()
        project_options.dataset.isactive = false 
    })
})

