export async function getAllCommentsOfPosts(postId){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    return new Promise((resolve) => {
         $fetch(`${useRuntimeConfig().APIURL}comments/${postId}`, { 
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