import { Login, resAuth } from '~/types/login';
export function signupProcess<Login>(email, password){
    return new Promise((resolve) => {
        $fetch('http://192.168.31.186:3000/api/auth/signup', { 
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: { 'email': email, 'password': password },
            async onResponse({ request, response, options }) {    // Process the response data    
                resolve(response._data)  
            }
        });
    });
}