const btn_update_pricer = document.querySelector('#update-labels')
const container_cards = document.querySelector('#container-cards')
const template = document.querySelector('#template')
let cached_data = null

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
    if(cached_data){
        //load(cached_data)
        return;
    }

    const url = '../ti/pricerstatus.json'

    try {
        const response = await fetch(url)
        
        if(!response.ok){
            throw new Error(`Response1 status: ${response.status}`)
        }
        
        const statusData = await response.json()
        cached_data = statusData

        //createCardPricer(statusData, container_cards)
        loadData(statusData)

    } catch (error) {
        console.log(error.message)
    }
}

let loadData = (statusData) => {
    statusData.forEach(data => {
        const clone = template.content.cloneNode(true)
        let cod_filial = clone.querySelector('#cod')
        let filial = clone.querySelector('#filial') 
        cod_filial.textContent = data.cod
        filial.textContent = data.filial
        clone.querySelector('.card-pricer').setAttribute('data-id', data.cod)
        container_cards.appendChild(clone)
        updateStatus(data)
    }); 
}

let updateStatus = function(data){
    let server = data.server_status
    let archive = data.archive_status
    let serviceServer = data.services[0]
    let serviceSQL = data.services[1] 

    const container_status = `
    <div id="container-status" data-isactive="false">
        <hr>
        <section class="status" id="container_status_server">
            <img src="../imagens/icons/ti_icon.png" alt="" class="icon icon-status">
            <div class="content">
                <p class="title">Servidor</p>
                <p class="label">Nome:
                    <span class="text-normal" id="server_name">${server.name}</span>
                </p>
                <p class="label">Ip:
                    <span class="text-normal" id="ip">${server.ip}</span>
                </p>
                <p class="label">Domínio:
                    <span class="text-normal" id="domain">${server.domain}</span>
                </p>
                <p class="label">Última Atualização:
                    <span class="text-normal" id="last_update">${server.last_update}</span>
                </p>
                <p class="label">Duração:
                    <span class="text-normal" id="duration_update">${server.duration_update}</span>
                </p>
            </div>
        </section>
        <hr>
        <section class="status" id="container_status_archive">
            <img src="../imagens/icons/ti_icon.png" alt="" class="icon icon-status">
            <div class="content">
                <p class="title">Arquivo</p>
                <p class="label">Nome:
                    <span class="text-normal" id="archive_name">${archive.name}</span>
                </p>
                <p class="label">Tamanho:
                    <span class="text-normal" id="size">${archive.size}</span>
                </p>
                <p class="label">Gerado:
                    <span class="text-normal" id="created">${archive.created}</span>
                </p>
            </div>
        </section>
        <hr>
        <section class="status" id="container_status_services">
            <img src="../imagens/icons/ti_icon.png" alt="" class="icon icon-status">
            <div class="content">
                <p class="title">Serviços</p>
                <p class="label">Nome:
                    <span class="text-normal" id="service_name">${serviceServer.name}</span>
                </p>
                <p class="label">Status:
                    <span class="text-normal" id="status">${serviceServer.status}</span>
                </p>
                <p class="label">Nome:
                    <span class="text-normal" id="service_name">${serviceSQL.name}</span>
                </p>
                <p class="label">Status:
                    <span class="text-normal" id="status">${serviceSQL.status}</span>
                </p>
            </div>
        </section>
    </div>`
   
    try {
        container_cards.querySelectorAll('.card-pricer').forEach((element) => {
            if(element.getAttribute('data-id') === data.cod){
                element.insertAdjacentHTML('beforeend', container_status)
            }            
        })
    } catch (error) {
        console.log(error)
    }
}

container_cards.addEventListener('click', (e) => {
    card = e.target.closest('.card-pricer')
    
    let isactive = false
    let statusCard = card.getAttribute('data-isactive')
    const container_status = card.querySelector('#container-status')

    if(!container_status){
        console.log('Não encontrou o container_status')
        return;
    }
    statusCard === "false"?isactive = true:isactive = false

    card.setAttribute('data-isactive', isactive)
    container_status.setAttribute('data-isactive', isactive)
})

btn_update_pricer.addEventListener('click', (() => {confirm('Deseja atualizar todas as etiquetas eletrônicas?')}))