<script setup lang="ts">
import { alertShow, object, PCR } from '~/stores/objects';

const userInfos = useCookie('userInfos');

const indexData = defineProps({
    post: {
        type: Object,
        required: true,
    }
})
console.log(indexData.post);
console.log(userInfos);
const emit = defineEmits(['refreshPosts']);

const data = reactive({
    commentsToggle : false,
    editUpdate: false,
    getImage: indexData.post.imageUrl,
    comments: [],
    date: new Date(indexData.post.createdAt),
    options: {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timeZone: 'America/Cayenne',
    }
})


async function fetchAllCommentsOfPosts(postId){
    const res = await getAllCommentsOfPosts(postId);
    data.comments = res.comment;
}
fetchAllCommentsOfPosts(indexData.post.id); 

function setImage(image) {
    if(!image == null){
        data.getImage = image;
    }
    return;
}


async function reqDeletePost(postId) {
    await deletePost(postId);
    emit('refreshPosts');
}

async function refreshAllComments() {
    await fetchAllCommentsOfPosts(indexData.post.id);
}

</script>
<template lang="">

    <div class="flex justify-center w-screen my-5">
        <div class="flex flex-col w-3/4 h-fit rounded-lg shadow-lg py-5">
            <div class="flex justify-between content-center">
                <div class="flex items-center">
                <!-- REPLACE ICON WITH USER AVATAR -->
                    <span><img :src="indexData.post.User.avatarUrl" class="rounded-full h-8 w-8 mx-4"></span>
                <!-- MISSING : FUNCTION TO SHOW EMAIL OR FIRSTNAME + LASTNAME IF DEFINE  -->
                    <h3 class="text-lg">{{ indexData.post.User.firstName }} {{ indexData.post.User.lastName }}</h3>
                </div>
                <div class="flex">
                    <button v-if="indexData.post.UserId == userInfos.id || userInfos.admin == true" v-on:click="data.editUpdate =! data.editUpdate"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-xl text-third hover:text-primary mr-4"/></button>
                    <button v-if="indexData.post.UserId == userInfos.id || userInfos.admin == true" @click.prevent="reqDeletePost(post.id)"><font-awesome-icon icon="fa-solid fa-trash" class="text-xl text-third hover:text-primary mr-4"/></button>
                </div>
            </div>
            <div class="flex mx-4">
                    <h4>{{ data.date.toLocaleDateString('fr-FR', data.options) }}</h4>
            </div>
            <div v-if="!data.editUpdate" class="flex mx-4 my-2 justify-center">
                <img :src="indexData.post.imageUrl"/>
            </div>
            <ReactivePostContent :editUpdate="data.editUpdate" :post="indexData.post" v-on:refreshPosts="emit('refreshPosts')" v-on:disableEdit="data.editUpdate = false"/>    
            <CommentPart v-if="!data.editUpdate" :commentsToggle="data.commentsToggle" v-on:refreshComments="refreshAllComments()" :post="indexData.post" :comments="data.comments"><Reactions :post="indexData.post" v-on:refreshPosts="emit('refreshPosts')" /></CommentPart>
        </div>
    </div>
</template>
<style lang="">
    
</style>