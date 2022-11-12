<script setup lang="ts">
import { Login, resAuth } from '~/types/login';
import { alertShow, object } from '~/stores/objects';

useHead({  
  title: 'Groupomania - Inscription', 
})


definePageMeta({  middleware: ["if-logged"] })

const dataTo = reactive({
  email: "",
  password: "",
  password2: "",
})

async function postSignupForm() {
  object.loading = true;
  if(dataTo.email.length == 0 || dataTo.password.length == 0 || dataTo.password2.length == 0) {
    object.loading = false;
    alertShow.toggleAlert = true;
    alertShow.alertMsg = "Veuillez remplir tout les champs";
    alertShow.alertError = true;
    return;
  }
  if(dataTo.password === dataTo.password2) {
    const res:any = await signupProcess<Login>(dataTo.email, dataTo.password);
    console.log(res);
    switch(res.alert){
      case 1: 
        object.loading = false;
        alertShow.toggleAlert = true;
        alertShow.alertMsg = res.message;
        alertShow.alertSuccess = true,
        alertShow.alertWarning = false;
        alertShow.alertError = false;
        setTimeout(() => {alertShow.toggleAlert = false, navigateTo("/auth/login")}, 2000)
        break;
      case 2:
        object.loading = false;
        alertShow.toggleAlert = true;
        alertShow.alertMsg = res.message;
        alertShow.alertSuccess = false,
        alertShow.alertWarning = true;
        alertShow.alertError = false;
        break;
      case 3:
        object.loading = false;
        alertShow.toggleAlert = true;
        alertShow.alertMsg = res.message;
        alertShow.alertSuccess = false,
        alertShow.alertWarning = false;
        alertShow.alertError = true;
    }
  }
  else {
    object.loading = false;
    alertShow.toggleAlert = true;
    alertShow.alertMsg = "Les mots de passe ne correspondent pas";
    alertShow.alertError = true;
    return;
  }
}
</script>
<template lang="">
  <div class=" flex justify-center items-center w-screen h-screen">
    <div class="flex flex-col justify-center items-center sm:w-3/4 md:w-3/4 mg:w-2/4 w-2/5 h-3/4 shadow-lg rounded-xl gap-5 bg-white ">
        <div class="flex flex-col gap-5 justify-center items-center sm:w-3/4 w-2/4">
          <img src="~/assets/images/groupomania.webp"/>
          <h1 class="text-3xl text-third uppercase">Inscription</h1>
        </div>
        <div class="w-2/4 h-0.5 bg-primary"></div>
        <form class="flex items-center flex-col w-3/4 gap-5">
          <input v-model="dataTo.email" class="input-auth w-3/4" type="email" name="email" placeholder="Email" required/>
          <input v-model="dataTo.password" class="input-auth w-3/4" type="password" name="password" placeholder="Mot de passe" required/>
          <input v-model="dataTo.password2" class="input-auth w-3/4" type="password" name="password2" placeholder="Confirmation" required/>
          <Alert :toggleAlert="alertShow.toggleAlert" :alertMsg="alertShow.alertMsg" :alertError="alertShow.alertError" :alert-success="alertShow.alertSuccess"/>
          <span v-if="object.loading != false" class="animate-spin"><font-awesome-icon icon="fa-solid fa-spinner" /></span>
          <button @click.prevent="postSignupForm" class="button-login" v-if="object.loading == false">Je m'inscris</button>
          <NuxtLink to="login"><button class="button-login_2">Je me connecte</button></NuxtLink>
        </form>
    </div>
  </div>
</template>

<style lang="">
    
</style>