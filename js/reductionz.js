import { ProcessJson } from "../js/api.js"
let subsidiarys = await ProcessJson('../json/subsidiarys.json')

let select_subs = document.querySelector('#select-subs')

function updateFilterSubss(id, name){
    //const template = document.querySelector("#template-option-subs")
    //let clone = template.content.cloneNode(true).querySelector('.option-subs')
    //clone.value = id
    //clone.textContent = `${id} - ${name}`

    const parent = "#template-option-subs"
    const selector = '.option-subs'

    let data_to_clone = 
    [
        {name: "value", value: `${id}`}, 
        {name: "textContent", value: `${id} - ${name}`}
    ]

    let cloneReturn = createClone(parent, selector, data_to_clone)
    //console.log(cloneReturn)
    //console.log(clone.hasAttribute('class'))
    //console.log(template.att)
    
    select_subs.appendChild(cloneReturn)
}


function createClone(parent, selector, attributes){
    const template = document.querySelector(parent)
    let clone = template.content.cloneNode(true).querySelector(selector)

    //console.log(clone)
    //console.log(template)

    attributes.forEach((atr)=>{
        if(atr.name === 'textContent'){
            clone.textContent = atr.value
        }

        if(clone.hasAttribute(atr.name)){
            clone.setAttribute(atr.name, atr.value)          
        }
    })

    //console.log(clone.attributes)
    return clone;
}


subsidiarys.forEach(element => {
    updateFilterSubss(element.id, element.name)
});