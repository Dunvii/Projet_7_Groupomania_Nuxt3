export default defineNuxtRouteMiddleware( async(to, from) => {
    const userInfos = useCookie('userInfos');
    if(userInfos.value.firstName == null || userInfos.value.lastName == null) {
        navigateTo('/profile');
    }
});