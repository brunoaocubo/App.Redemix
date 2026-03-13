const btn_close_container = document.querySelector('.close-container')
const btn_add_email = document.querySelector('#btn-add-email')
const main = document.querySelector('main')
const nav = document.querySelector("#nav-placeholder")

btn_close_container.addEventListener('click', (evt)=>{
    evt.target.closest('#container-new-email').setAttribute('data-isactive', false)
    toggle_bright()
})

btn_add_email.addEventListener('click', ()=>{
    btn_close_container.closest('#container-new-email').setAttribute('data-isactive', true)
    toggle_bright()
})

const toggle_bright = ()=>{
    let arr = [main, nav]
    let attr_inactive = 'data-inactive';

    arr.forEach((element)=>{
        if(element.hasAttribute(attr_inactive))
            element.removeAttribute(attr_inactive)
        else 
            element.setAttribute('data-inactive', "")
    })
}