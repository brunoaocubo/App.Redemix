import {ProcessJson} from '../js/api.js'
const prices_data = await ProcessJson('../json/changedprices.json')
const subsidiaries = await ProcessJson('../json/subsidiarys.json')

const window_filter = document.querySelector('.window-filter')
const btn_open_filter = document.querySelector('#open-filter')
const btn_search_filter = window_filter.querySelector('#search-filter')
const main = document.querySelector('main')

let select_subs = window_filter.querySelector('#subs')

main.addEventListener('click', (evt)=>{
    if(evt.target === main){
        window_filter.setAttribute('data-isactive', 'false')
    }
})

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

    const date = window_filter.querySelector('select#date').value
    const sub = select_subs.value

    showDataTable(sub, date, prices_data)
})

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

let updateFilters = function(parent_selector, template, selector, data){
    let parent = window_filter.querySelector(parent_selector)
    let newtemplate = window_filter.querySelector(template)
    let option;

    parent.querySelectorAll(selector).forEach((element)=>{
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

    let clone = createClone(newtemplate, selector, data_to_clone)

    parent.appendChild(clone)
}

let showDataTable = (id, date, data)=>{
    let tbody = document.querySelector('tbody.row')
    tbody.innerHTML = ''
    
    data.forEach((element)=>{
        if(date == element.date_to_change && element.id == id){
            let createCard = `
                <tr class="row">  
                <td>${element.ean}</td>
                <td>${element.description}</td>
                <td>${element.price}</td>
                <td>${element.price2}</td>
                <td>${element.promotion}</td>
                <td>${element.section}</td>
                <td>${element.group}</td>
                <td>${element.subgroup}</td>
                <td>${element.date_start}</td>
                <td>${element.date_final}</td>
                </tr>
            `;
            
            tbody.insertAdjacentHTML('beforeend',createCard)
        }
    })
}

prices_data.forEach((element) => {
    subsidiaries.forEach((sub)=>{
        if(element.id == sub.id){
            updateFilterSub(element.id, sub.name)
        }
    })
    updateFilters('#date','#template-opt-date', '.option-date', element.date_to_change)
    updateFilters('#promotion','#template-opt-promotion','.option-promotion',element.promotion)
    updateFilters('#section', '#template-opt-section','.option-section', element.section)
    updateFilters('#group', '#template-opt-group','.option-group', element.group)

})