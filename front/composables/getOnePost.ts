export async function getOnePost(postId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`${useRuntimeConfig().APIURL}posts/${postId}`, { 
        method: 'GET',  
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}