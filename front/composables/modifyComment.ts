export async function modifyComment(commentId, content){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`${useRuntimeConfig().APIURL}comments/${commentId}`, { 
        method: 'PUT',  
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}