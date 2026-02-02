const section_icon = document.querySelectorAll('.project-section')
let cached_data = null;


section_icon.forEach((icon) => {
    const project_options = icon.lastElementChild
    icon.addEventListener('mouseenter', (evt) => {
        evt.stopPropagation()
        project_options.dataset.isactive = true
    })
    icon.addEventListener('mouseleave', (evt) =>{
        evt.stopPropagation()
        if(evt){
            project_options.dataset.isactive = false     
        }
    })
})



async function getData(){
    /*
    if(cached_data){
        loadData(cached_data)
        return;
    }*/

    const url1 = '../data.json'
    const url2 = '../department.json'

    try {
        const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)])
        
        if(!response1.ok || !response2.ok){
            throw new Error(`Response1 status: ${response1.status} and Response2 status: ${response2.status}`)
        }

        const userData = await response1.json()
        const sectorData = await response2.json()
        //cached_data = result

        loadData(userData, sectorData)
    } catch (error) {
        console.log(error.message)
    }
}

const loadData = (userData, sectorData) => {
    //console.log(userData.users)
    //console.log(sectorData.sector)
    const card_user = document.querySelector('#card')
    const section = card_user.querySelector('#section')
    const department = card_user.querySelector('#department')
    const location = card_user.querySelector('#location')
    const user = card_user.querySelector('#user')
    const email = card_user.querySelector('#email')
    const telnumber = card_user.querySelector('#telnumber')
    
    location.textContent = userData.users[0].location

    sectorData.sector.forEach((element) => {
        if(userData.users[0].sector === element.id){
            section.textContent = element.name
        }
    })
}

getData()