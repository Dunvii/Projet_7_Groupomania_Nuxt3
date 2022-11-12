export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useCookie('auth');
    const userInfos = useCookie('userInfos');
    if(auth.value != undefined && userInfos.value != undefined){
        navigateTo('/');
    }
})