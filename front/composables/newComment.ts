export async function addCommentOnPost(postId, content) {
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`http://192.168.31.186:3000/api/comments/${postId}`, { 
        method: 'POST', 
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    });
    return res;
}