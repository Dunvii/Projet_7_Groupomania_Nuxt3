import { PCR } from '~/stores/objects';
export async function getAllPosts(){
    const auth = useCookie('auth');
    return new Promise((resolve) => {
        $fetch('http://192.168.31.186:3000/api/posts/', { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.value}`,
            },
            async onResponse({ request, response, options }) {
                console.log(response._data);
                resolve(response._data);
            }
        });
    });
}