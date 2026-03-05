//let cached_user_data = null;
//let cached_department_data = null;
//let cached_cupons = null;

let cached = new Map()

export async function ProcessJson(url) {
    if(cached.has(url)){
        //console.log('Cached ja possui o seu json!')
        return cached.get(url);
    }
        //console.log('Cached ainda não possuia o seu json!')

    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Status de Resposta: ${response.status}`)
        }

        const result = await response.json()
        cached.set(url, result)

        console.log(cached)
        return result;

    } catch (error) {
        console.log(error)
    }
}

/*
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

/*
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
}*/

/*
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