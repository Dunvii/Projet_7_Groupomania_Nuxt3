<script setup lang="ts">

const emit = defineEmits(['refreshPosts']);

const data = reactive({
    image: false,
    content: null,
    newPost: false,
    loading: false,
})

function imageChange(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  data.image = files[0];
}

async function fetchNewPost(){
    data.loading = true;
    await newPost(data.image, data.content);
    data.loading = false;
    data.newPost = true;
    emit('refreshPosts');
    setTimeout(() => {data.newPost = false}, 1000)
}

</script>
<template lang="">
    <div class="flex justify-center w-screen">
        <div class="flex flex-col items-center w-3/4 h-fit rounded-lg shadow-lg py-5">
            <div class="flex justify-center w-3/4l h-fit">
                    <h2 class="text-xl md:text-xl sm:text-sm uppercase">Creer une nouvelle publication</h2>
            </div>
            <form class="flex flex-col w-full items-center">
                <div class="flex justify-center my-4 w-3/4 h-fit">
                    <textarea v-model="data.content" maxlength="500" class="resize-none w-full h-40 focus:outline-none border border-third/20 rounded-lg shadow-lg"></textarea>
                </div>
                <div class="flex flex-col justify-center items-center my-4 w-3/4 h-fit border rounded-lg p-5 border-third/20">
                    <label class="block hover:cursor-pointer">
                        <input v-on:change="imageChange" type="file" class="hover:cursor-pointer block w-full text-sm text-third file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-secondary file:text-third file:hover:text-white file:hover:bg-primary"/>
                    </label>
                </div>
                <div class="flex flex-col items-center"> 
                    <button @click.prevent="fetchNewPost()" class="button-login mb-2">Publier</button>
                    <span v-if="data.loading != false" class="animate-spin"><font-awesome-icon icon="fa-solid fa-spinner" /></span>
                    <label v-if="data.newPost == true" class="text-green-alert">Nouveau post ✓</label>
                </div>
            </form>
        </div>
    </div>
</template>
<style lang="">
    
</style>