export async function newPost(image, content){
    const Cookie = useCookie('auth');
    const authCookie = Cookie.value;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("content", content);  
    if(image != false) {
        const resImage = await $fetch("http://192.168.31.186:3000/api/posts/", { 
            method: 'POST', 
            body: formData, 
            headers: {
                'Authorization': 'Bearer ' + authCookie,
            }
        })
        return resImage;
    }
    const res = await $fetch("http://192.168.31.186:3000/api/posts/", { 
        method: 'POST',  
        body: { content: content },
        headers: {
            'Authorization': 'Bearer ' + authCookie,
        }
    })
    return res;

}