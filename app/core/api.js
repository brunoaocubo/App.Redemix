/**
 * Instructions:
 * @param {'/folder/data.json'} url - Indique o caminho completo do arquivo .json.
 * @param {boolean} saveLocal - (true = cached) / (false = not cached).
 * @returns 
 */
export async function ProcessJson(url, saveLocal = false) {

    if(saveLocal === true && localStorage.getItem(url)){
        let result = localStorage.getItem(url)
        return JSON.parse(result);
    }

    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Status de Resposta: ${response.status}`)
        }

        const result = await response.json()

        if(saveLocal === true){
            try {
                localStorage.setItem(url, JSON.stringify(result))
            } catch (error) {
                console.log(error)   
            }
        }

        return result;

    } catch (error) {
        console.log(error)
    }
}
 

// FETCH ANTIGO - FUNCIONAL, MAS SEM UM CACHÊ LOGIC BEM FEITO //
/*

let cached_user_data = null;
let cached_department_data = null;
let cached_cupons = null;

export async function Users(){
    const url = '../users.json'

    return ProcessJson(url, cached_user_data);
}

//console.log(await Users())

export async function Departments() {
    const url = '../department.json'

    return ProcessJson(url, cached_department_data);
}

//console.log(await Departments())

export async function Cupons() {
    const url = '../vendas/cupons.json'

    return ProcessJson(url, cached_cupons);
}

//console.log(await Cupons())

export async function Users(){
    if(cached_user_data){
        return cached_user_data;
    }

    const url = '../users.json'
    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Status de Resposta: ${response.status}`)
        }

        const result = await response.json()
        cached_user_data = result

        return result;

    } catch (error) {
        console.log(error)
    }
}


export async function Departments(){
    if(cached_department_data){
        return cached_department_data;
    }

    const url = '../department.json'
    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Status de Resposta: ${response.status}`)
        }

        const result = await response.json()
        cached_department_data = result

        return result;

    } catch (error) {
        console.log(error)
    }
}*/