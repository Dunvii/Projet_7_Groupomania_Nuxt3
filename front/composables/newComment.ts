export async function addCommentOnPost(postId, content) {
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`${useRuntimeConfig().APIURL}comments/${postId}`, { 
        method: 'POST', 
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    });
    return res;
}