const calendar = document.querySelector('#calendar')
let cached_data;

document.addEventListener('DOMContentLoaded', async () => {
    try{
        await getData()
        console.log("Página carregada com sucesso!")
    }
    catch(error){
        console.error("Erro ao carregar", error)
    }
})

async function getData(){
    /*
    if(cached_data){
        load(cached_data)
        return;
    }*/

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

let getTotalValueCupons = ()=>{
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

document.addEventListener('DOMContentLoaded', (()=>{
    updateMainSummary()
}))

let updateMainSummary = async () => {
    await getData()

    const main_summary = document.querySelector('.main-summary')
    const s_year = main_summary.querySelector('.year')
    const s_month = main_summary.querySelector('.month')
    const s_dayweek = main_summary.querySelector('.dayweek')
    const total_value_cupons = main_summary.querySelector('.total-value-cupons')
    
    let dateNow = new Date()
    let year = dateNow.getFullYear()
    let month = dateNow.getMonth()
    let dayweek = dateNow.getDay()
    let date = dateNow.getDate()

    s_year.textContent = year
    s_month.textContent = checkMonth(month)
    s_dayweek.textContent = `${checkDay(dayweek)}, ${date}`
    total_value_cupons.textContent = getTotalValueCupons()
}