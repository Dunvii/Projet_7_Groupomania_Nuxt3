import { PCR } from '~/stores/objects';
export async function getAllPosts(){
    const auth = useCookie('auth');
    return new Promise((resolve) => {
        $fetch(`${useRuntimeConfig().APIURL}posts/`, { 
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