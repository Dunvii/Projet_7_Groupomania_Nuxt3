<script setup lang="ts">

useHead({  
  title: 'Groupomania - Acceuil', 
})

definePageMeta({  middleware: [] })

const data = reactive({
    posts: [],
})

async function fetchAllPosts(){
    data.posts = await getAllPosts();
    console.log(data.posts);
}

fetchAllPosts();

</script>
<template lang="">
  <NuxtLayout>
  <NavBar />
  <NewPost v-on:refreshPosts="fetchAllPosts()"/>
  <Post v-on:refreshPosts="fetchAllPosts()" v-for="post of data.posts" :post="post" :key="post.id" /> 
</NuxtLayout>
</template>