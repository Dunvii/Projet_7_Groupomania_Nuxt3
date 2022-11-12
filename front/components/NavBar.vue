<script setup lang="ts">
import { alertShow, object } from '~/stores/objects';

const userInfos = useCookie('userInfos');
const auth = useCookie('auth');

const data = reactive({
    computerMenuToggle: ref(false),
    responsiveMenuToggle: ref(false),
    avatarToShow: userInfos.value.avatarUrl,
})


async function logout(){
    auth.value = null;
    userInfos.value = null;
    alertShow.toggleAlert = false;
    alertShow.alertMsg = "";
    alertShow.alertWarning = false;
    object.loading = false;
    return window.location.href = "/auth/login";
}


</script>
<template lang="">
    <div class="flex justify-between w-screen h-12 bg-primary shadow-lg">
        <div class="flex items-center ml-2">
            <img src="~/assets/images/groupomania-white.webp" class="h-2/4 hover:cursor-pointer" v-on:click="navigateTo('/')"/>
        </div>
        <ul class="flex items-center justify-between mr-2 relative sm:hidden md:hidden">
            <li v-on:click="data.computerMenuToggle = !data.computerMenuToggle" class="hover:cursor-pointer"><img :src="data.avatarToShow" class="h-6 w-6 rounded-full"></li>
            <button @click.prevent="logout" class="hover:cursor-pointer"><font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-white text-xl ml-4"/></button>
            <div v-if="data.computerMenuToggle" class="bg-white shadow-md w-32 h-fit absolute top-11 right-8 rounded-lg" >
                <font-awesome-icon icon="fa-solid fa-caret-up" class="absolute right-2 -top-2 text-white"/>
                <ul class="my-3 text-sm ml-2">
                    <NuxtLink to="/profile"><li class="group hover:text-primary"><font-awesome-icon icon="fa-solid fa-user-pen" class="group-hover:text-primary text-third text-xs w-5"/>Mon profil</li></NuxtLink>
                    <NuxtLink to="/settings"><li class="group hover:text-primary"><font-awesome-icon icon="fa-solid fa-gear" class="group-hover:text-primary text-third text-xs w-5"/>Paramètres</li></NuxtLink>
                </ul>
            </div>
        </ul>
        <ul class="computer:hidden flex items-center justify-between mr-2">
            <li v-on:click="data.responsiveMenuToggle = !data.responsiveMenuToggle"><font-awesome-icon icon="fa-solid fa-bars" class="text-white hover:cursor-pointer" /></li>
        </ul>
    </div>
    <ul v-if="data.responsiveMenuToggle" class="computer:hidden flex flex-col items-center py-4 text-lg bg-white shadow-sm gap-2 mb-5">
        <NuxtLink to="/profile"><li class="hover:text-primary">Mon Profil</li></NuxtLink>
        <div class="w-full h-0.5 bg-third/20"></div>
        <NuxtLink to="/settings"><li class="hover:text-primary">Parametres</li></NuxtLink>
        <div class="w-full h-0.5 bg-third/20"></div>
        <button @click.prevent="logout" class="hover:text-primary">Deconnexion</button>
    </ul>
</template>
