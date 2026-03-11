import {ProcessJson} from '../js/api.js'
const prices_data = await ProcessJson('../json/changedprices.json')
const subsidiaries = await ProcessJson('../json/subsidiarys.json')

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

let select_subs = window_filter.querySelector('#subs')
let template_opt_subs = window_filter.querySelector('#template-opt-subs')

let updateFilterSub = function(id, name){
    let option;
    select_subs.querySelectorAll('.option-subs').forEach((element)=>{
        if(element.value == id){
            option = element.value
            return;
        }
    })

    if(option == id){ return; }

    let data_to_clone = 
    [
        {name:"value",value:`${id}`},
        {name:"textContent",value:`${id} - ${name}`}
    ]

    let clone = createClone(template_opt_subs, '.option-subs', data_to_clone)

    select_subs.appendChild(clone)
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

//let select_date = window_filter.querySelector('#date')
//let template_date = select_date.querySelector('#template-opt-date')

let updateFilters = function(parent_selector, template_selector, data){
    let parent = window_filter.querySelector(parent_selector)
    let template = window_filter.querySelector(template_selector)
    let child = template.querySelector('option')
    let option;

    parent.querySelectorAll(template).forEach((element)=>{
        if(element.value == data){
            option = element.value
            return;
        }
    })

    if(option == data){ return; }

    let data_to_clone = 
    [
        {name:"value",value:`${data}`},
        {name:"textContent",value:`${data}`}
    ]

    let clone = createClone(template, template_selector, data_to_clone)

    parent.appendChild(clone)
}

let select_promotion = window_filter.querySelector('#promotion')
let template_promotion = select_promotion.querySelector('#template-opt-promotion')

prices_data.forEach((element) => {
    subsidiaries.forEach((sub)=>{
        if(element.id == sub.id){
            updateFilterSub(element.id, sub.name)
        }
    })
    updateFilters('#date','#template-opt-date', element.date_to_change)
})