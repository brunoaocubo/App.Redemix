import { dataUserLogged } from "../js/assign.js";


if(dataUserLogged != null){
    let timesInactive = 0

    const timeToLogout = (m) =>{
        //1 second = 1000 milliseconds in SetTimeout
        const second = 1000; 
        const minute = second * 60
        const timer = minute * m
        return timer;
    }

    const forceLogout = () => {
        document.addEventListener('click', () => {
            window.alert('Você foi desconectado por inatividade, faça o login novamente.')
            localStorage.clear()
            document.location.href = '../www/login.html'
        })  
    }

    const NotifyInactivity = () =>{
        if(timesInactive < 2){
            let text = 'Você será desconectado por inatividade, clique ok para continuar online!'
            
            if(confirm(text)){
                timesInactive ++;
            }
            else{
                timesInactive = 3;
            } 
            return;
        }

        forceLogout()
    }

    let timeout = null
    timeout = setInterval(NotifyInactivity, timeToLogout(5)) //Minutes

    document.addEventListener('click', () => {
        clearInterval(timeout)
        timeout = null
        if(timeout === null){
            timeout = setInterval(NotifyInactivity, timeToLogout(5))
        }
    })
}
else{
    window.alert('Você está desconectado, faça o login novamente!')
    document.location.href = '../www/login.html'
}




