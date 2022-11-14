export async function newPost(image, content){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);  
    if(image != false) {
        const resImage = await $fetch(`${useRuntimeConfig().APIURL}posts/`, { 
            method: 'POST', 
            body: formData, 
            headers: {
                'Authorization': 'Bearer ' + authCookie,
            }
        })
        return resImage;
    }
    const res = await $fetch(`${useRuntimeConfig().APIURL}posts/`, { 
        method: 'POST',  
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;

}