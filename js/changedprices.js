import {ProcessJson} from '../js/api.js'
const prices_data = await ProcessJson('../json/changedprices.json')
console.log(prices_data)

const window_filter = document.querySelector('.window-filter')
const btn_open_filter = document.querySelector('#open-filter')
const btn_search_filter = window_filter.querySelector('#search-filter')
const main = document.querySelector('main')

btn_open_filter.addEventListener('click', ()=>{
    const act_attr = window_filter.getAttribute('data-isactive')
    let value_attr = 'false'
    if(act_attr === 'false'){
        value_attr = 'true'
    }
    window_filter.setAttribute('data-isactive', value_attr)
})

btn_search_filter.addEventListener('click', ()=>{
    const general_filter = document.querySelector('.general-filter')
    const act_attr = general_filter.getAttribute('data-isactive')
    let value_attr = 'false'
    if(act_attr === 'false'){
        value_attr = 'true'
    }
    general_filter.setAttribute('data-isactive', value_attr)
})

main.addEventListener('click', (evt)=>{
    if(evt.target === main){
        window_filter.setAttribute('data-isactive', 'false')
    }
})

let updateTable = function(){
   
}

const createClone = (template, selector, attributes)=>{
    let new_clone = template.content.cloneNode(true).querySelector(selector)

    attributes.forEach((atr)=>{
        if(atr.name === 'textContent'){
            new_clone.textContent = atr.value
        }

        if(new_clone.hasAttribute(atr.name)){
            new_clone.setAttribute(atr.name, atr.value)          
        }
    })
    return new_clone;
}

let updateFilterSubss = function(id, name){
    let data_to_clone = 
    [
        {name: "value", value: `${id}`}, 
        {name: "textContent", value: `${id} - ${name}`}
    ]
    let clone = createClone(template_opt_subs, '.option-subs', data_to_clone)

    select_subs.appendChild(clone)
}

prices_data.forEach((element) => {
    updateTable(element.id, element)
})