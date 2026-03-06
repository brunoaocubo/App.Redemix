import { ProcessJson } from "../js/api.js"
let subsidiarys = await ProcessJson('../json/subsidiarys.json')
let cupons_data = await ProcessJson('../vendas/cupons.json', false);

const list_itens = document.querySelector('.list-itens')
const btn_calendar = document.querySelector('#calendar')
const type_search = document.querySelectorAll('.type-search')
const secconddate = document.querySelector("#seconddate").closest('div')

type_search.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        type_search.forEach((n)=>{n.setAttribute('data-isactive', false)})
        btn.setAttribute('data-isactive',true)

        if(btn.id === 'toggle-period'){
            secconddate.setAttribute('data-isactive', true)
        }
        else{
            secconddate.setAttribute('data-isactive', false)
        }
    })
})

btn_calendar.addEventListener('click', ()=>{
    const container_filter = document.querySelector('.container-filter')
    if(container_filter.getAttribute('data-isactive') === 'false'){
        container_filter.setAttribute('data-isactive', true)
    }
    else{
        container_filter.setAttribute('data-isactive', false)
    }
})

const parseValue = (value) => Math.round(parseFloat(value.replace(',','.')*100))

let processSales = (cupons = cupons_data)=>{
    const resume = {}
    
    cupons.forEach((cupom)=>{
        if(!resume[cupom.id]){
            resume[cupom.id] = {id: cupom.id, total: 0, qtt: 0, delivery: 0, hours: []}
        }

        const value = parseValue(cupom.valor)
        const hour = cupom.horario.split(':')[0]

        resume[cupom.id].total += value
        resume[cupom.id].qtt += 1
        
        if(cupom.delivery){resume[cupom.id].delivery += value}

        resume[cupom.id].hours.push({hour,value})
    })
    return Object.values(resume)
}

let loadData = ()=>{
    const cupons = processSales()
    subsidiarys.forEach((element)=>{
        createCardMarket(element.id, element.name, cupons)
    })
}

let createCardMarket = function(id, name, cupons){
    const template = document.querySelector('#template-card-market')
    const clone = template.content.cloneNode(true)
    const market = clone.querySelector('.market span')
    market.textContent = `${id} - ${name}`
    list_itens.appendChild(clone)

    const parent = market.closest('.item').querySelector('.list-itens-pdv')

    try {
        cupons.forEach((cupom)=>{
            if(id == cupom.id){
                for (let index = 0; index < cupom.hours.length; index++) {
                    createCardPdv(parent)
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

let createCardPdv = function(parent){
    const template = document.querySelector('#template-pdv')
    const clone = template.content.cloneNode(true)
    
    parent.appendChild(clone)
}

loadData()