export async function deleteUser(email: any){
    const auth = useCookie('auth');
    const userInfos = useCookie('userInfos');
    return new Promise((resolve) => {
        $fetch(`${useRuntimeConfig().APIURL}auth/delete`, { 
            method: 'DELETE', 
            body: { email: email },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.value}`,
            },
            async onResponse({ request, response, options }) {
                resolve(response._data);
            }
        })
    })
}

