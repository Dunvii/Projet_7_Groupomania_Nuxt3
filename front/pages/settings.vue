<script setup lang="ts">
import { alertShow, object } from '~/stores/objects';

const data = reactive({
    email: null,
})

async function fetchDeleteAccount(){
    object.loading = true;
    await deleteUser(data.email)
    .then((data:any) => {
        switch(data.alert){
            case 1:
            object.loading = false;
            alertShow.toggleAlert = true;
            alertShow.alertMsg = data.message;
            alertShow.alertSuccess = true;
            alertShow.alertWarning = false;
            alertShow.alertError = false;
            data.email = null;
            break;
            case 2:
            object.loading = false;
            alertShow.toggleAlert = true;
            alertShow.alertMsg = data.message;
            alertShow.alertError = true;
            data.email = null;
            break;
            case 3:
            object.loading = false;
            alertShow.toggleAlert = true;
            alertShow.alertMsg = data.message;
            alertShow.alertError = true;
            data.email = null;
            break;
        }
    })
}
</script>
<template lang="">
    <NuxtLayout>
        <NavBar />
        <div class="flex w-full items-center">
            <form class="flex w-full flex-col items-center gap-4 mt-5">
                <h2 class="text-xl">Supprimer le compte d'un utilisateur :</h2>
                <input v-model="data.email" placeholder="Email" />
                <button @click.prevent="fetchDeleteAccount()" v-if="data.email != null" type="email" class="button-login w-fit">Supprimer le compte</button>
                <Alert :toggleAlert="alertShow.toggleAlert" :alertMsg="alertShow.alertMsg" :alertError="alertShow.alertError" :alert-success="alertShow.alertSuccess"/>
                <span v-if="object.loading != false" class="animate-spin"><font-awesome-icon icon="fa-solid fa-spinner" /></span>
                </form> 
        </div>
    </NuxtLayout>
</template>
