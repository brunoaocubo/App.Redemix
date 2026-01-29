const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll(".input-login")
const loading = document.querySelector("#container-loading")
let cached_data = null;

async function getData(){
    if(cached_data){
        auth(cached_data)
        return;
    }

    const url = '../data.json'
    try {
        const response = await fetch(url)
        
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json()
        cached_data = result
        auth(result)
    } catch (error) {
        console.log(error.message)
    }
}

const auth = (result) => {
    const u = inputs[0].value
    const p = inputs[1].value
    const message = document.querySelector("#message")

    if(u === '' || p === ''){
        message.textContent = "Por favor preencha todos os campos."
        return;
    }
    startLoading()
    const user = result.users.find(element => element.u === u && element.p === p)
    
    setTimeout(() => {
        if(user){
            message.textContent = `Login realizado com sucesso. Seja, bem-vindo ${user.name}!`
            message.dataset.success = true
            document.location.assign('app.html')
        }
        else{
            message.textContent = `O usuário ou senha digitados estão incorretos!`
            message.dataset.success = false
            return;
        }
    }, 2000)
}

const startLoading = () =>{
    if(loading.getAttribute('data-isloading') === 'false'){
        loading.dataset.isloading = true
        submit.disabled = true
    }
}

inputs.forEach((input) => {
    input.addEventListener('keydown', () => {
        if(loading.getAttribute('data-isloading') === 'true'){
            loading.dataset.isloading = false
            submit.disabled = false     
        }
    })
})

submit.addEventListener('click', () => {
    getData()
})