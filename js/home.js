const section_icon = document.querySelectorAll('.project-section')
let cached_data = null;

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
        loadData(cached_data)
        return;
    }

    const url = '../department.json'

    try {
        const response = await fetch(url)
        
        if(!response.ok){
            throw new Error(`Response1 status: ${response.status}`)
        }
        
        cached_data = response
        const departmentData = await response.json()

        checkListUsers(departmentData)

    } catch (error) {
        console.log(error.message)
    }
}

const getUserLogin = () => {
    let user = localStorage.getItem("user")
    let obj = JSON.parse(user)
    return obj;
}

const checkListUsers = (departmentsData)=>{
    let user = getUserLogin()

    departmentsData.forEach((department) => 
    {
        department.sections.forEach((section) => 
        {
            if(user.department === department.id && user.section === section.id)
            {
                updateCardUser(user, department.name, section.name)
            }
        })
    })   
}

const updateCardUser = (user, departmentData, sectionData) => {
    const fullName = document.querySelector('#full-name')
    const card_user = document.querySelector('#card')
    const section = card_user.querySelector('#section')
    const department = card_user.querySelector('#department')
    const location = card_user.querySelector('#location')
    const userCard = card_user.querySelector('#user')
    const email = card_user.querySelector('#email')
    const telnumber = card_user.querySelector('#telnumber')

    fullName.textContent = user.fullname;
    section.textContent = sectionData
    department.textContent = departmentData
    location.textContent = user.location
    userCard.textContent = user.u
    email.textContent = user.email

    user.tel != null?telnumber.textContent = user.tel:telnumber.textContent = ""
}

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