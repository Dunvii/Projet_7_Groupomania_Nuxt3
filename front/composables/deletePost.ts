export async function deletePost(postId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`${useRuntimeConfig().APIURL}posts/${postId}`, { 
        method: 'DELETE', 
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}

