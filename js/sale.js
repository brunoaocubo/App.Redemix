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

/*
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
}*/

function formatedCurrencyBR(value){ 
    let valueFormated = value/100
    return valueFormated.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function calcPercent(value){
    let cupons = cached_data
    let total = 0
    cupons.forEach((element)=>{
        total += Math.round(parseFloat(element.valor.replace(',','.') * 100))
    })
    total = total/100
    let porcentagem = (total * 1)/100
    let resultado = value/porcentagem
    return resultado;
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
    const monthFormat = now.toLocaleString('pt-BR', {month: "long"})
    s_year.textContent = now.getFullYear()
    s_month.textContent = monthFormat.charAt(0).toUpperCase() + monthFormat.slice(1)
    s_dayweek.textContent = `${now.toLocaleString('pt-BR', {day: "2-digit"})}, ${now.toLocaleString('pt-BR', {weekday: "long"})}`
    total_values.textContent = formatedCurrencyBR(totalValues)

    for(let i = 0; i < subsidiarys.length; i++){
        createCard(subsidiarys[i], cupons)
    }
}


//CREATE CARD
let createCard = function(id, cupons){
    const clone = template.content.cloneNode(true)
    const market = clone.querySelector('.market dd')
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

            calcSalesHour(id, cupom.horario, cupom.valor)
        }
    })
    let cp_percentValue = calcPercent(cp_totalValue/100).toFixed(2);
    let cp_percentValueFormated = cp_percentValue + "%"

    market.textContent = id
    percent_value.textContent = cp_percentValueFormated
    delivery_value.textContent = formatedCurrencyBR(cp_deliveryValue)
    total_cupons.textContent = cp_quantity
    total_value.textContent = formatedCurrencyBR(cp_totalValue)
    orderContainer(cp_percentValue, clone)
    
    try {
        let containerListItens = market.closest('.item').querySelector('.container-itens-hour .list-itens-hour')   
        valuePerHour.forEach((element)=>{
            if(element.id === id){
                createItemHour(containerListItens, element.hour, element.value)
            }
        })
    } 
    catch (error) {
        console.log(error.message)
    }
}

let createItemHour = function(parent, hour, value){
    const valueFormat = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    const container_sale_hour = `
        <dl class="item-hour flex-col">
            <dt>${hour}${'H'}</dt>
            <hr>
            <dd>${valueFormat}</dd>
        </dl>`
    parent.insertAdjacentHTML('beforeend', container_sale_hour)
}

function orderRank(){
    let rank = container_list_itens.querySelectorAll('.rank-number')
    
    let position = 1
    rank.forEach((element)=>{
       element.textContent = position
       position++
    })
    console.log(rank)
}

let listClones = []


let orderContainer = function(percent, clone){  
    listClones.push({percent, clone})
    listClones.sort(function(a, b){return b.percent - a.percent})

    if(listClones.length >= 25){
        listClones.forEach((element)=>{
            container_list_itens.appendChild(element.clone)
        })
    }
    else{
        return "Ainda falta filial";
    }

    orderRank()
}



let valuePerHour = []

function calcSalesHour(id, hour, value){
    const formatedHour = hour.replace(/:.*/, "") 
    value = value.replace(',', '.') * 100
    value = value/100

    if(valuePerHour.length <= 0){
        valuePerHour.push({id,  hour: formatedHour, value: value})    
        return;
    }

    const registerExist = valuePerHour.find(element => element.id === id && element.hour === formatedHour)

    if(registerExist){ 
        let newValue = registerExist.value + value
        registerExist.value = newValue
    }
    else{
        valuePerHour.push({id,  hour: formatedHour, value: value})  
    }
}