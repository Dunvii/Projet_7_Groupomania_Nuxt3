<script setup lang="ts">
import { Login } from '~/types/login';
import { alertShow, object } from '~/stores/objects';
useHead({  
  title: 'Groupomania - Mon profil', 
})

definePageMeta({  middleware: ["auth"] })

let auth = useCookie('auth');
let userInfos = useCookie('userInfos');

const A = reactive({
    firstName: userInfos.value.firstName,
    lastName: userInfos.value.lastName,
    avatarUrl: false,
    password: null,
    newPassword: null,
    email: userInfos.value.email,
    loading: false,
    avatarToShow: userInfos.value.avatarUrl,
})

if(A.firstName == null && A.lastName == null) {
  alertShow.toggleAlert = true;
  alertShow.alertWarning = true;
  alertShow.alertMsg = "Veuillez renseigner nom et prénom.";
}

function imageChange(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  A.avatarUrl = files[0];
}

async function fetchUpdateUser() {
  if(A.newPassword != null) {
    object.loading = true;
    await updateUser(A.avatarUrl, A.email, A.firstName, A.lastName, A.password, A.newPassword) 
    .then((data:any) => {
      switch(data.alert){
        case 1: 
          object.loading = false;
          alertShow.toggleAlert = true;
          alertShow.alertMsg = data.message;
          alertShow.alertSuccess = true;
          userInfos = useCookie('userInfos');
          A.avatarToShow = userInfos.value.avatarUrl;
          A.firstName = userInfos.value.firstName;
          A.lastName = userInfos.value.lastName;
          break;
        case 3:
          object.loading = false;
          alertShow.toggleAlert = true;
          alertShow.alertMsg = data.message;
          alertShow.alertError = true;
      }
    })
  }
  object.loading = true;
  A.newPassword = false;
  await updateUser(A.avatarUrl, A.email, A.firstName, A.lastName, A.password, A.newPassword)
  .then((data:any) => {
    switch(data.alert){
        case 1: 
          object.loading = false;
          alertShow.toggleAlert = true;
          alertShow.alertMsg = data.message;
          alertShow.alertSuccess = true;
          alertShow.alertWarning = false;
          alertShow.alertError = false;
          userInfos = useCookie('userInfos');
          A.avatarToShow = userInfos.value.avatarUrl;
          A.firstName = userInfos.value.firstName;
          A.lastName = userInfos.value.lastName;
          break;
        case 3:
          object.loading = false;
          alertShow.toggleAlert = true;
          alertShow.alertMsg = data.message;
          alertShow.alertError = true;
          break;
      }
  })

}


</script>
<template lang="">
  <NuxtLayout>
    <NavBar />
    <div class="flex flex-col w-full items-center my-10 gap-8">
      <div>
        <h1 class="text-2xl">Mon Profil</h1>
      </div>
      <form class="flex flex-col gap-8 w-full items-center ">
        <img :src="A.avatarToShow" class="rounded-full w-64 sm:w-32"/>
        <label class="block hover:cursor-pointer">
          <input v-on:change="imageChange" type="file" title=" " class="hover:cursor-pointer block w-full text-sm text-third file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-secondary file:text-third file:hover:text-white file:hover:bg-primary"/>
        </label>
        <input v-model="A.firstName" class="input-auth w-1/4 sm:w-2/4" placeholder="Prénom" />
        <input v-model="A.lastName" class="input-auth w-1/4 sm:w-2/4" placeholder="Nom" />
        <input v-model="A.newPassword" class="input-auth w-1/4 sm:w-2/4" placeholder="Nouveau mot de passe (optionnel)"/>
        <label class="text-center mx-2">Veuillez confirmer votre mot de passe pour effectuer les changements ci-dessous :</label>
        <input v-model="A.password" class="input-auth w-1/4 sm:w-2/4" placeholder="Mot de passe"/>
        <Alert :toggleAlert="alertShow.toggleAlert" :alertMsg="alertShow.alertMsg" :alertError="alertShow.alertError" :alert-success="alertShow.alertSuccess"/>
        <button v-if="A.firstName != null && A.lastName != null && A.password != null && object.loading == false" @click.prevent="fetchUpdateUser()" class="button-login">Mettre à jour</button>
        <span v-if="object.loading != false" class="animate-spin"><font-awesome-icon icon="fa-solid fa-spinner" /></span>
      </form>
    </div>
  </NuxtLayout>
</template>
