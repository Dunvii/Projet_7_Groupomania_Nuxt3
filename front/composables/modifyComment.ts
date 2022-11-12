export async function modifyComment(commentId, content){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`http://192.168.31.186:3000/api/comments/${commentId}`, { 
        method: 'PUT',  
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}