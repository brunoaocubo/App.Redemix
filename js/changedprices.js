const btn_open_filter = document.querySelector('#open-filter')

btn_open_filter.addEventListener('click', ()=>{
    const window_filter = document.querySelector('.window-filter')

    if(window_filter.getAttribute('data-isactive') === 'false'){
        window_filter.setAttribute('data-isactive', true)
    }
    else{
        window_filter.setAttribute('data-isactive', false)
    }
})