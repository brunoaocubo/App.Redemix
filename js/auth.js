const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll(".input-login")

submit.addEventListener('click', () => {
    getData()
})

async function getData(){
    const url = '../data.json'
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }
        
        const result = await response.json()
        auth(result)
    } catch (error) {
        console.log(error.message)
    }
}

const auth = (result) => {
    result.users.forEach(element => {
        const u = inputs[0].value
        const p = inputs[1].value
        
        if(u === '' && p === ''){
            console.log("Usuário inválido.")
        }
        else if(u === element.u && p === ''){
            console.log("Senha não informada.")
        }
        else if(u != '' && p != ''){
            const loading = document.querySelector("#container-loading")
            const isloading = loading.getAttribute('data-isloading')
        
            if(isloading === 'false'){
                loading.setAttribute('data-isloading', 'true')
            }   

            if(u != element.u || p != element.p){
                console.log("Nome de usuário ou senha incorretos.")
            }
            else if(u === element.u && p === element.p){
                console.log(`Login realizado com Sucesso! Bem-vindo ${element.u}`)
                window.location.assign("app.html")
            }
        }
    });
}