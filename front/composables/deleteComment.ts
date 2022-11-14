export async function deleteComment(commentId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`${useRuntimeConfig().APIURL}comments/${commentId}`, { 
        method: 'DELETE', 
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}

