const calendar = document.querySelector('#calendar')
const container_list_itens = document.querySelector('.list-itens')
const market_summary = container_list_itens.querySelector('.market-summary-grid')
const template = document.querySelector('#template')
let subsidiarys = []
let cached_data;

calendar.addEventListener('click', (() => {
    const date_filter = document.querySelector('.date-filter')
    if(date_filter.getAttribute('data-isactive') === "false"){
        date_filter.style.display = "flex"
        date_filter.setAttribute('data-isactive', true)
    }
    else{
        date_filter.style.display = "none"
        date_filter.setAttribute('data-isactive', false)
    }
}))

document.addEventListener('DOMContentLoaded', async () => {
    try{
        await getData()
        console.log("Página carregada com sucesso!")
    }
    catch(error){
        console.error("Erro ao carregar", error)
    }

    loadData(cached_data)
})

async function getData(){
    if(cached_data){
        //createCard(cached_data)
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
    } catch (error) {
        console.log(error.message)
    }
}


let order = []

let getTotalValueByMarket = (id_market) => {
    if(cached_data === null){
        return;
    }

    let cupons = cached_data
    let total = 0

    cupons.forEach((element)=>{
        if(element.id != id_market){
            return;
        }   

        const valorLimpo = element.valor.replace(',','.')
        total += Math.round(parseFloat(valorLimpo * 100))
    })
    total = total/100
    //order.push({id_market, total})
    //order.sort(function(a, b){return b.total - a.total})
    //total = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    return total;
}

//console.log(order)

let getDeliveryByMarket = (id_market) => {
    if(cached_data === null){
        return;
    }

    let cupons = cached_data
    let delivery = 0

    cupons.forEach((element)=>{
        if(element.id != id_market){
            return;
        }   

        if(element.delivery){
            const valorLimpo = element.valor.replace(',','.')
            delivery += Math.round(parseFloat(valorLimpo * 100))
        }
    })

    delivery = delivery/100
    delivery = delivery.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    return delivery;
}

let checkMonth = (month) =>{
    const months = [{id: 0,name: 'Janeiro'},{id: 1,name: 'Fevereiro'},{id: 2,name: 'Março'},{id: 3,name: 'Abril'},{id: 4,name: 'Maio'},{id: 5,name: 'Junho'},{id: 6,name: 'Julho'},{id: 7,name: 'Agosto'},{id: 8,name: 'Setembro'},{id: 9,name: 'Outubro'},{id: 10,name: 'Novembro'},{id: 11,name: 'Dezembro'}]
   
    months.forEach(element => {
        if(month === element.id){
            month = element.name
        }
    });

    return month;
}

let checkDay = (dayWeek) =>{
    const weekDays = [{id: 0, name: "Domingo"}, {id: 1, name: "Segunda-feira"}, {id: 2, name: "Terça-feira"}, {id: 3, name: "Quarta-feira"}, {id: 4, name: "Quinta-feira"}, {id: 5, name: "Sexta-feira"}, {id: 6, name: "Sábado"}]

    weekDays.forEach((element) => {
        if(dayWeek === element.id){
            dayWeek = element.name
        }
    })
    
    return dayWeek;
}

/*
let TotalValueCupons = ()=>{
    if(cached_data === null){
        console.log('Os dados dos cupons estão vazios')
        return;
    }

    let total = 0;
    let cupons = cached_data

    cupons.forEach((element)=>{
        const valorLimpo = element.valor.replace(',','.')
        total += Math.round(parseFloat(valorLimpo * 100))
    })
    total = total/100
    total = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

    return total
}
*/


function formatedCurrencyBR(value){
    let valueFormated = value/100
    return valueFormated.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

//LOAD DATA
let loadData = (cupons) => {
    let totalValues = 0;
    
    cupons.forEach((cupom) => {
        const valorLimpo = cupom.valor.replace(',','.')
        totalValues += Math.round(parseFloat(valorLimpo * 100))      
        
        if(!subsidiarys.includes(cupom.id)){
            subsidiarys.push(cupom.id)
        }    
    })

    const main_summary = document.querySelector('.main-summary')
    const s_year = main_summary.querySelector('.year')
    const s_month = main_summary.querySelector('.month')
    const s_dayweek = main_summary.querySelector('.dayweek')
    const total_values = main_summary.querySelector('.total-value-cupons')

    let now = new Date()
    s_year.textContent = now.getFullYear()
    s_month.textContent = checkMonth(now.getMonth())
    s_dayweek.textContent = `${checkDay(now.getDay())}, ${now.getDate()}`
    total_values.textContent = formatedCurrencyBR(totalValues)

    for(let i = 0; i < subsidiarys.length; i++){
        createCard(subsidiarys[i], cupons)
    }
}


//CREATE CARD
let createCard = function(id, cupons){
    const clone = template.content.cloneNode(true)
    clone.querySelector('.market dd').textContent = id
    const percent_value = clone.querySelector('dt .percent-sale')
    const delivery_value = clone.querySelector('.delivery dd')
    const total_cupons = clone.querySelector('.total-cupons dd')
    const total_value = clone.querySelector('.total-value-sale dd')

    let cp_totalValue = 0;
    let cp_deliveryValue = 0;
    let cp_quantity = 0;

    cupons.forEach((cupom) => {
        if(id === cupom.id){
            cp_quantity++
            cp_totalValue += Math.round(parseFloat(cupom.valor.replace(',', '.') * 100))

            if(cupom.delivery){
                cp_deliveryValue += Math.round(parseFloat(cupom.valor.replace(',', '.') * 100))
            }
        }
    })
    let cp_percentValue = calcPercent(cp_totalValue/100).toFixed(2);

    percent_value.textContent = cp_percentValue
    delivery_value.textContent = formatedCurrencyBR(cp_deliveryValue)
    total_cupons.textContent = cp_quantity
    total_value.textContent = formatedCurrencyBR(cp_totalValue)

    container_list_itens.appendChild(clone)

    //let valueToOrder = cp_totalValue/100
    //order.push({percent_value, valueToOrder})
    //order.sort(function(a, b){return b.valueToOrder - a.valueToOrder})

    //orderContainer(cp_percentValue, clone)
    /*
    let list_markets_cod = []
    cupons.forEach((cupom)=>{
        if(list_markets_cod.includes(cupom.id)){
            return;
        }
        list_markets_cod.push(cupom.id)
        const clone = template.content.cloneNode(true)
        let market_name = clone.querySelector('.market dd')
        let percent_value = clone.querySelector('dt .percent-sale')
        let delivery = clone.querySelector('.delivery dd')
        let total_cupons = clone.querySelector('.total-cupons dd')
        let total_value = clone.querySelector('.total-value-sale dd')

        let valueFormated = getTotalValueByMarket(cupom.id)
        valueFormated = valueFormated.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        //let deliveryValue = getDeliveryByMarket(cupom.id)
        //let totalCp = getQuantityCupons(cupom.id)

        market_name.textContent = cupom.id
        percent_value.textContent = calcularPorcentagem(getTotalValueByMarket(cupom.id)).toFixed(2) + "%"
        delivery.textContent = getDeliveryByMarket(cupom.id)
        total_cupons.textContent = getQuantityCupons(cupom.id)
        total_value.textContent = valueFormated

        container_list_itens.appendChild(clone)
    })
    
    const market = `
        <div class="container-itens-hour flex-col border-content color-seccondary">
            <h3>VENDAS POR HORA</h3>
            <div class="list-itens-hour flex-row">
                <dl class="item-hour flex-col">
                    <dt>6H</dt>
                    <hr>
                    <dd>1.120,16</dd>
                </dl>
            </div>
        </div>
                        </details>`
    
    try {
            
    } catch (error) {
        
    }*/
}

let orderContainer = function(percent, clone){
    
    //let arr = Object.values(object)
    //object.sort(function(a, b){return b - a[0]})
    console.log(object)
}

console.log(order)

function calcPercent(value){
    let total = 45780.53
    let porcentagem = (total * 1)/100
    let resultado = value/porcentagem
    return resultado;
}
