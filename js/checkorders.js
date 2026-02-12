const download = document.querySelector("#download")
const date = document.querySelector("#date")
const loading = document.querySelector("#container-loading")



download.addEventListener('click', () => {
    loading.setAttribute('data-isloading', true)
    setTimeout(()=>{
        loading.setAttribute('data-isloading', false)
        loading.textContent = 'Arquivo gerado com sucesso!'
    }, 10000)
})