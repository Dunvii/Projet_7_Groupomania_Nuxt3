export async function getAllCommentsOfPosts(postId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    return new Promise((resolve) => {
         $fetch(`http://192.168.31.186:3000/api/comments/${postId}`, { 
        method: 'GET',  
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        },
        async onResponse({ request, response, options }) {
            resolve(response._data);
        }
        });
    })
}