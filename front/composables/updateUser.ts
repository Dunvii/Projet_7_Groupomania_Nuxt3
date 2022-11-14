import { Login, resAuth } from '~/types/login';
export async function updateUser(avatar, email, firstName, lastName, password, newPassword){
    const auth = useCookie('auth');
    const formData = new FormData();
    if (newPassword == false) {
        formData.append("email", email);
        formData.append("user", { firstName: firstName, lastName: lastName });
        formData.append("image", avatar);
        formData.append("oldPassword", password);  
        formData.append("newPassword", password);
        if(avatar != false) {
            return new Promise((resolve) => {
                $fetch(`${useRuntimeConfig().APIURL}auth/modify`, { 
                    method: 'PUT', 
                    body: formData, 
                    headers: {
                        'Authorization': `Bearer ${auth.value}`,
                    },
                    async onResponse({ request, response, options }) {
                        await loginProcess<Login>(email, password);
                        resolve(response._data);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            $fetch(`${useRuntimeConfig().APIURL}auth/modify`, { 
                method: 'PUT',  
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.value}`, // notice the Bearer before your token
                },
                body: { user: { firstName: firstName, lastName: lastName }, email: email, oldPassword: password, newPassword: password },
                async onResponse({ request, response, options }) {
                    await loginProcess<Login>(email, password);
                    resolve(response._data);
                }
            })
        })
    }
    if (newPassword != false) {
        formData.append("email", email);
        formData.append("user", { firstName: firstName, lastName: lastName });
        formData.append("image", avatar);
        formData.append("oldPassword", password);  
        formData.append("newPassword", newPassword);
        if(avatar != false) {
            return new Promise((resolve) => {
                $fetch(`${useRuntimeConfig().APIURL}auth/modify`, { 
                    method: 'PUT', 
                    body: formData, 
                    headers: {
                        'Authorization': `Bearer ${auth.value}`,
                    },
                    async onResponse({ request, response, options }) {
                        await loginProcess<Login>(email, newPassword);
                        resolve(response._data);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            $fetch(`${useRuntimeConfig().APIURL}auth/modify`, { 
            method: 'PUT',  
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${auth.value}`, // notice the Bearer before your token
            },
            body: { user: { firstName: firstName, lastName: lastName }, email: email, oldPassword: password, newPassword: newPassword },
            async onResponse({ request, response, options }) {
                await loginProcess<Login>(email, newPassword);
                resolve(response._data);
            }
            })
        })
    }

}