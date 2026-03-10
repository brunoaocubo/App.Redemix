const btn_open_filter = document.querySelector('#open-filter')
const window_filter = document.querySelector('.window-filter')
const btn_search_filter = window_filter.querySelector('#search-filter')
const main = document.querySelector('main')

btn_open_filter.addEventListener('click', ()=>{
    if(window_filter.getAttribute('data-isactive') === 'false'){
        window_filter.setAttribute('data-isactive', true)
    }
    else{
        window_filter.setAttribute('data-isactive', false)
    }
})

btn_search_filter.addEventListener('click', ()=>{
    const general_filter = document.querySelector('.general-filter')

    if(general_filter.getAttribute('data-isactive') === 'false'){
        general_filter.setAttribute('data-isactive', true)
    }
    else{
        general_filter.setAttribute('data-isactive', false)
    }
})

main.addEventListener('click', (evt)=>{
    if(evt.target != btn_open_filter && evt.target != btn_search_filter){
        
        window_filter.setAttribute('data-isactive', false)
    }
})