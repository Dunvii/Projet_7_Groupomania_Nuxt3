<script setup lang="ts">
import { Login } from '~/types/login';
import { alertShow, object } from '~/stores/objects';
useHead({  
  title: 'Groupomania - Login', 
})

definePageMeta({  middleware: ["if-logged"] })



const dataTo = reactive({
  email: "",
  password: "",
})



async function postLoginForm() {
  object.loading = true;
  const res:any = await loginProcess<Login>(dataTo.email, dataTo.password);
  console.log(res)
  switch(res.alert){
    case 1:
      object.loading = false;
      alertShow.toggleAlert = true;
      alertShow.alertMsg = res.message;
      alertShow.alertSuccess = true;
      setTimeout(() => {alertShow.toggleAlert = false, navigateTo("/")}, 2000);
      break;
    case 2:
      object.loading = false;
      alertShow.toggleAlert = true;
      alertShow.alertMsg = res.message;
      alertShow.alertWarning = true;
      break;
    case 3:
      object.loading = false;
      alertShow.toggleAlert = true;
      alertShow.alertMsg = res.message;
      alertShow.alertError = true;
      break;
  }
  return console.log("finish");
}

</script>
<template lang="">
  <NuxtLayout>
    <div class=" flex justify-center items-center w-screen h-screen">
        <div class="flex flex-col justify-center items-center sm:w-3/4 md:w-3/4 mg:w-2/4 w-2/5 h-3/4 shadow-lg rounded-xl gap-5 bg-white ">
          <div class="flex flex-col gap-5 justify-center items-center sm:w-3/4 w-2/4">
            <img src="~/assets/images/groupomania.webp"/>
            <h1 class="text-3xl text-third uppercase">Connexion</h1>
          </div>
          <form class="flex items-center flex-col w-3/4 gap-5">
            <input v-model="dataTo.email" class="input-auth w-3/4" type="email" name="email" placeholder="Email" />
            <input v-model="dataTo.password" class="input-auth w-3/4" type="password" name="password" placeholder="Mot de passe" />
            <Alert :toggleAlert="alertShow.toggleAlert" :alertMsg="alertShow.alertMsg" :alertError="alertShow.alertError" :alert-success="alertShow.alertSuccess"/>
            <button @click.prevent="postLoginForm()" class="button-login w-3/4" v-if="object.loading == false">Se connecter</button>
            <span v-if="object.loading != false" class="animate-spin"><font-awesome-icon icon="fa-solid fa-spinner" /></span>
            <NuxtLink to="signup"><button class="button-login_2">Inscription</button></NuxtLink>
          </form>
        </div>
    </div>
  </NuxtLayout>
</template>