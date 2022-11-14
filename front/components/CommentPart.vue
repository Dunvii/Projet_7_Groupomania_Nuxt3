<script setup lang="ts">

const userInfos = useCookie('userInfos');

const fromPost = defineProps({ 
    commentsToggle: {
        type:Boolean,
        required: true
    },
    comments: {
        type:Array,
        required: true
    },
    post: {
        type:Object,
        required: true,
    }
})

const data = reactive({
    counterComments: 0,
    content: null,
})

const emit = defineEmits(['refreshComments']);

async function fetchAddCommentOnPost() {
    if(userInfos.value.firstName == null || userInfos.value.lastName == null) {
        navigateTo('/profile');
    }
    else {
        await addCommentOnPost(fromPost.post.id, data.content);
        data.content = null;
        emit('refreshComments');
    }

}

</script>
<template lang="">
    <ul class="flex items-center mx-4 my-2 ">
        <slot/>
        <li v-on:click="commentsToggle = !commentsToggle" class="text-third cursor-pointer"><font-awesome-icon icon="fa-solid fa-comments" /></li>
        <li v-on:click="commentsToggle = !commentsToggle" class="cursor-pointer ml-2"> <h4>{{ fromPost.comments.length }} commentaires</h4></li>
        
    </ul>
    <div v-show="fromPost.commentsToggle">
        <div class="flex mx-4 my-2">
            <!-- REPLACE ICON WITH USER AVATAR -->
            <font-awesome-icon icon="fa-solid fa-circle-user" class="mr-4 text-xl text-third hover:text-primary"/>
        <!-- NEED TO FIX : Show new comment at click -->
            <input v-model="data.content" type="text" placeholder="Nouveau commentaire..." class="w-full focus:outline-none">
            <button v-on:click="fetchAddCommentOnPost()" class="flex items-center button-valid h-fit w-fit"><font-awesome-icon icon="fa-solid fa-plus" /></button>
        </div>
        
        <Comment v-on:refreshComments="emit('refreshComments')" v-for="comment of fromPost.comments" :comment="comment" />
        
    </div> 
</template>