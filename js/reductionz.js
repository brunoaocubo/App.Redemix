import { ProcessJson } from "../js/api.js"
let subsidiaries = await ProcessJson('../json/subsidiarys.json')
let pdvs_registred = await ProcessJson('../json/pdvregistred.json')

const template_opt_subs = document.querySelector("#template-option-subs")
const template_opt_pdvs = document.querySelector('#template-option-pdvs')
let select_subs = document.querySelector('#select-subs')
let pdv_select = document.querySelector('#pdv-select')

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

let updateFilterPdv = function(list_pdv){
    let list_clones = []
    list_pdv.forEach((pdv)=>{
        let data_to_clone = 
        [
            {name: "value", value: `${pdv}`},
            {name: "textContent", value: `${pdv}`}
        ]
        list_clones.push(createClone(template_opt_pdvs, '.option-pdvs', data_to_clone))
    })

    pdv_select.innerHTML = ''

    list_clones.forEach((pdv)=>{
        pdv_select.appendChild(pdv)
    })
}

subsidiaries.forEach(element => {
    updateFilterSubss(element.id, element.name)
});

select_subs.addEventListener('change', ()=>{
    pdvs_registred.forEach((element)=>{
        if(select_subs.value == element.id){
            updateFilterPdv(element.list_pdv)
        }
    })
})

pdvs_registred.forEach((element)=>{
    if(select_subs.value == element.id){
        updateFilterPdv(element.list_pdv)
    }
})
