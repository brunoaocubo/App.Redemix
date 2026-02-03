const submit = document.querySelector("#submit")
const inputs = document.querySelectorAll(".input-login")
const loading = document.querySelector("#container-loading")
let cached_data = null;

async function getData(){
    if(cached_data){
        auth(cached_data)
        return;
    }

    const url = '../users.json'
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
    StatusLoading(true)
    const user = result.find(element => element.u === u && element.p === p)
    
    //const user = Object.values(result.users).filter(element => element.u === u && element.p === p)

    setTimeout(() => {
        if(user){
            message.textContent = `Login realizado com sucesso. Seja, bem-vindo ${user.name}!`
            message.dataset.success = true
            document.location.assign('home.html')
            SaveUser(user)
        }
        else{
            message.textContent = `O usuário ou senha digitados estão incorretos!`
            message.dataset.success = false
            return;
        }
    }, 2000)
}

const SaveUser = (user) => {
    delete user.p
    delete user.name

    const userSave = JSON.stringify(user)
    localStorage.setItem("user", userSave)
}

const StatusLoading = (bool) =>{
    if(bool){
        loading.dataset.isloading = true
        submit.disabled = true
    }
    else{
        loading.dataset.isloading = false
        submit.disabled = false    
    }
}

inputs.forEach((input) => {
    input.addEventListener('keydown', () => {
        StatusLoading(false)
    })
})

submit.addEventListener('click', () => {
    getData()
})