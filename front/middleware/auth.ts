export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useCookie('auth');
    const userInfos = useCookie('userInfos');
    return new Promise((resolve) => {
        $fetch(`${useRuntimeConfig().APIURL}posts/`, { 
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.value}`,
            },
            async onResponse({ request, response, options }) {
                if (!response.status === 200){
                    auth.value = undefined;
                    userInfos.value = undefined;
                    navigateTo("/auth/login");
                    resolve();
                }
                else{
                    resolve();
                }
            }
        })
    })
})

