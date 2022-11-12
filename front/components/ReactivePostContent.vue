<script setup lang="ts">

const fromPost = defineProps({ 
    editUpdate: {
        type:Boolean,
        required: true
    },
    post: {
        type:Object,
        required: true
    }
})

const data = reactive({
    image: false,
    content: fromPost.post.content,
})

const emit = defineEmits(['refreshPosts', 'disableEdit']);

function imageChange(e) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length)
    return;
  data.image = files[0];
}

async function updatePost() {
        await modifyPost(fromPost.post.id, data.image, data.content);
        emit('refreshPosts');
        emit('disableEdit');
}

</script>
<template lang="">
    <div class="flex mx-4 my-2"> 
        <p v-if="!editUpdate"> {{ fromPost.post.content }}</p>
            <div v-if="editUpdate" class="flex w-full">
                <form class="flex flex-col w-full justify-center items-center">
                    <div class="flex flex-col justify-center items-center my-4 w-full h-fit border rounded-lg p-5 border-third/20">
                        <label class="block hover:cursor-pointer">
                            <input v-on:change="imageChange" type="file" class="hover:cursor-pointer block w-full text-sm text-third file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-secondary file:text-third file:hover:text-white file:hover:bg-primary"/>
                            </label>
                        </div>
                        <textarea v-model="data.content" maxlength="500" class="resize-none w-full h-40 focus:outline-none border border-third/20 rounded-lg shadow-lg mb-4"></textarea>
                        <button class="button-login" @click.prevent="updatePost()">Mettre à jour le post</button>
                </form>
            </div>
                
    </div>
</template>
<style lang="">
    
</style>