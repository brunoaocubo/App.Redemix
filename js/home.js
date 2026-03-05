import { dataUserLogged } from "./logoutObserver.js";
import { ProcessJson } from "../js/api.js";
//const section_icon = document.querySelectorAll('.project-section')
let department_data = await ProcessJson('../department.json', false);

document.addEventListener('DOMContentLoaded',  () => {
    try{
        console.log("Página carregada com sucesso!")

    }
    catch(error){
        console.error("Erro ao carregar", error)
    }
})

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

const checkListUsers = (departmentsData)=>{
    const user = dataUserLogged
    departmentsData.forEach((department) => 
    {
        department.sections.forEach((section) => 
        {
            if(user.department === department.id && user.section === section.id)
            {
                updateCardUser(user, department.name, section.name)

                
                //Para ser usado posteriormente quando definir visibilidade dos projetos por departamento do usuário
                localStorage.setItem('departmentUser', (section.name + " " + department.name))
            }
        })
    })   
}

checkListUsers(department_data)
