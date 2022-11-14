import { Login, resAuth } from '~/types/login';
export async function loginProcess<Login>(email, password){
    let auth = useCookie('auth');
    let userInfos = useCookie('userInfos');
    console.log("1");
    return new Promise((resolve) => {
        console.log("2");   
        $fetch(`${useRuntimeConfig().APIURL}auth/login`, { 
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: { 'email': email, 'password': password },
            async onResponse({ request, response, options }) {
                let auth = useCookie('auth');
                let userInfos = useCookie('userInfos');
                console.log("3")    // Process the response data    
                if(response._data.alert == 1){
                    auth.value = undefined;
                    auth.value = response._data.token;
                    userInfos.value = undefined;
                    userInfos.value = response._data.infos;
                    resolve(response._data);
                }
                if(response._data.alert == 2 || response._data.alert == 3){
                    auth.value = undefined;
                    userInfos.value = undefined;
                    resolve(response._data);
                }
                
            }
        });
    });
}
