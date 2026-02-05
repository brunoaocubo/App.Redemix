export const dataUserLogged = JSON.parse(localStorage.getItem('user'))
const inputs = document.querySelectorAll('.input')
const texts_card = document.querySelectorAll('.text-card-assign')
const departmentUser = localStorage.getItem('departmentUser')
//console.log(userData)



addEventListener('DOMContentLoaded', () => {
    inputs.forEach((input) => {
        input.id === "name"?input.value = dataUserLogged.fullname:null;
        input.id === "sector"?input.value = departmentUser:null;
        input.id === "tel"?input.value = dataUserLogged.tel:null;
        input.id === "email"?input.value = dataUserLogged.email:null;
        texts_card.forEach((text) => {
            if(input.id === text.id){
                text.textContent = ''
                text.textContent = input.value
            }
        })
    })
})

texts_card.forEach((text) => {
    inputs.forEach((input) => {
        input.addEventListener('keyup', () =>{
            if(input.id === text.id){
                text.textContent = ''
                text.textContent = input.value
            }
        })
    })
    //console.log(text.id + ":" + text.textContent)
})

const downloadCard = document.querySelector("#download-card")

$(function() { 
    $(downloadCard).click(function() { 
        html2canvas($("#card-assign"), {
            onrendered: function(canvas) {
                
                canvas.toBlob(function(blob) {
                    saveAs(blob, "Dashboard.png"); 
                });
            }
        });
    });
});




