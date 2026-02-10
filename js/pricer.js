const pricer = document.querySelector('#update-labels')
const card_price = document.querySelectorAll('.card-pricer')

card_price.forEach((card) => {
    card.addEventListener('click', () => {
        let isactive = false
        let statusCard = card.getAttribute('data-isactive')

        if(statusCard == "false")
        {
            isactive = true
        }
        else{
            isactive = false
        }

        card.setAttribute('data-isactive', isactive)
    })
})

pricer.addEventListener('click', (() => {
    confirm('Deseja atualizar todas as etiquetas eletrônicas?')
}))