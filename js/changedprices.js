const btn_open_filter = document.querySelector('#open-filter')
const window_filter = document.querySelector('.window-filter')
const main = document.querySelector('main')

btn_open_filter.addEventListener('click', ()=>{
    if(window_filter.getAttribute('data-isactive') === 'false'){
        window_filter.setAttribute('data-isactive', true)
    }
    else{
        window_filter.setAttribute('data-isactive', false)
    }
})
