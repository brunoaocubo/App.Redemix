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

let subsidiarys = []
let nameSubsidiarys = [
    {id:19,name:'PARIPE'},{id:35,name:'ITAIGARA'},{id:43,name:'SETE PORTAS'},{id:51,name:'IAPI'},{id:60,name:'VILA LAURA'},{id:94,name:'ITAPUA'},{id:108,name:'ALPHAVILLE'},{id:116,name:'PITUBA'},{id:124,name:'SIMOES FILHO'},{id:132,name:'IMBUI'},{id:140,name:'NUTRI PITUBA'},{id:175,name:'NUTRI BARRA'},{id:183,name:'MIRAGEM'},{id:302,name:'LITORAL'},{id:310,name:'HORTO'},{id:337,name:'VITORIA'},{id:345,name:'NUTRI SHOPPING'},{id:370,name:'ONDINA'},{id:434,name:'STELLA'},{id:442,name:'NUTRI ALPHA'},{id:450,name:'CHAME-CHAME'},{id:531,name:'NUTRI HORTO'},{id:582,name:'RIO VERMELHO'},{id:639,name:'SALVADOR SHOPPING'}
]
let cached_data;

addEventListener('DOMContentLoaded', async()=>{
    try{
        await getData()
        console.log('Página carregada com sucesso!')
    }
    catch(error){
        console.log(error)
    }
    loadData()
})

async function getData(){
    if(cached_data){
        loadData()
        return;
    }

    const url = '../vendas/cupons.json'

    try {
        const response = await fetch(url)
        
        if(!response.ok){
            throw new Error(`Response1 status: ${response.status}`)
        }
        
        const cuponsData = await response.json()
        cached_data = cuponsData
        processSales(cuponsData)
    } catch (error) {
        console.log(error.message)
    }
}

const parseValue = (value) => Math.round(parseFloat(value.replace(',','.')*100))

let processSales = (cupons = cached_data)=>{
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

    cupons.forEach((cupom) =>{
        nameSubsidiarys.forEach((subsidiary)=>{
            if(cupom.id == subsidiary.id)
            {
                subsidiarys.push({id:cupom.id, name:subsidiary.name})
            }
        })
    })

    subsidiarys.forEach((element)=>{
        createCardMarket(element.id, element.name, cupons)
    })

    console.log(subsidiarys)
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
            if(id === cupom.id){
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