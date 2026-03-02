const list_itens = document.querySelector('.list-itens')
let subsidiarys = []
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

let processSales = (cupons)=>{
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
    const cupons = processSales(cached_data)

    cupons.forEach((element) =>{
        if(!subsidiarys.includes(element.id)){subsidiarys.push(element.id)}
    })

    subsidiarys.forEach((id)=>{
        createCardMarket(id, cupons)
    })

    console.log(subsidiarys)
}

let createCardMarket = function(id, cupons){
    const template = document.querySelector('#template-card-market')
    const clone = template.content.cloneNode(true)
    const market = clone.querySelector('.market span')
    market.textContent = `${id} - nome filial`
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