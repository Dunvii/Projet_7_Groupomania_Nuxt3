export async function getOnePost(postId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const res = await $fetch(`http://192.168.31.186:3000/api/posts/${postId}`, { 
        method: 'GET',  
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;
}