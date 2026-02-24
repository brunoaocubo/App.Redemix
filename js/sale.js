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
        createItemHour(containerListItens, element.id, element.horario)
    } 
    catch (error) {
        console.log(error.message)
    }
}

let createItemHour = function(parent, id, hour, value){
    const container_sale_hour = `
        <dl class="item-hour flex-col">
            <dt>${hour}${'H'}</dt>
            <hr>
            <dd>${value}</dd>
        </dl>`
    parent.insertAdjacentHTML('beforeend', container_sale_hour)
}

let arr = []

let orderContainer = function(percent, clone){  
    arr.push({percent, clone})
    arr.sort(function(a, b){return b.percent - a.percent})

    if(arr.length >= 25){
        arr.forEach((element)=>{
            container_list_itens.appendChild(element.clone)
        })
    }
    else{
        return "Ainda falta filial";
    }
}

































let arr2 = []


function horarios(id, hour, value){
    let horarios = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
    let soma  = 0

    hour = hour.replace(/:.*/, "") 
    
    if(arr2.length <= 0){
        arr2.push({id, horario: hour, valor: value})    
        return;
    }

    arr2.forEach((data)=>{
        if(id === data.id && hour === data.horario){
            data.valor += value
        }
        else
        {
            arr2.push({id, horario: hour, valor: value})    
        }
    })
}

horarios(337, '09:09', 200)
horarios(337, '09:49', 20)
horarios(445, '10:59', 900)
horarios(445, '10:59', 900)


console.log(arr2)
