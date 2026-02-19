const calendar = document.querySelector('#calendar')

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


document.addEventListener('DOMContentLoaded', (()=>{
    updateMainSummary()
    fixMonth()
}))

let updateMainSummary = () => {
    const main_summary = document.querySelector('.main-summary')
    const year = main_summary.querySelector('.year')
    const month = main_summary.querySelector('.month')
    const dayweek = main_summary.querySelector('.dayweek')

   
    year.textContent = new Date().getFullYear()
    month.textContent = new Date().getMonth()
    dayweek.textContent = new Date().getDate()
}

let fixMonth = () =>{
    const months = [{0: 'Janeiro'}, {1: 'Fevereiro'}, {2: 'Março'}]
    const month = new Date().getMonth()

    months.forEach(element => {
        if(month === Object.keys(months)[element]){
            
        }
    });

    console.log(Object.keys(months)[2])
}