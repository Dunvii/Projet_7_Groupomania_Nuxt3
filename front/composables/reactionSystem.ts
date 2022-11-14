export async function reactionSystem(postId, status, type){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res:Object[] = await $fetch(`${useRuntimeConfig().APIURL}reactions/${postId}`, { 
        method: 'POST',
        body: { reaction : { status: status , type: type }},
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    console.log(res);
    return res;
}