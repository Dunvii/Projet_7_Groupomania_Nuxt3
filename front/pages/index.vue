<script setup lang="ts">

useHead({  
  title: 'Groupomania - Acceuil', 
})

definePageMeta({  middleware: ["auth"] })

const data = reactive({
    posts: [],
})

async function fetchAllPosts(){
    data.posts = await getAllPosts();
}

fetchAllPosts();

</script>
<template lang="">
  <NuxtLayout>
  <NavBar />
  <NewPost v-on:refreshPosts="fetchAllPosts()"/>
  <Post v-on:refreshPosts="fetchAllPosts()" v-for="post of data.posts.posts" :post="post" :key="post.id" /> 
</NuxtLayout>
</template>