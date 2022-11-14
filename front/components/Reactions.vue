<script setup lang="ts">

const userInfos = useCookie('userInfos');
const emit = defineEmits(['refreshPosts']);

const fromPost = defineProps({ 
    post: {
        type:Object,
        required: true,
    }
})

const data = reactive({
    type: ["like"],
})

const likes = computed(() => fromPost.post.Reactions.filter((reaction) => reaction.type == "like"));
const liked = computed(() => typeof likes.value.find((reaction) => reaction.userId == userInfos.value.id) === "object");

async function fetchReactionsSystem(postId, status, type) {
    await reactionSystem(postId, status, type);
    emit('refreshPosts');
}


</script>
<template lang="">
    <button @click.prevent="fetchReactionsSystem(fromPost.post.id, 1, 'like')" v-if="liked == false" class="flex items-center mx-4 my-2 group">
    <li class="text-third group-hover:text-primary cursor-pointer"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></li>
        <li class="cursor-pointer ml-2 group-hover:text-primary">{{ likes.length }}</li>
        <li class="cursor-pointer ml-2 group-hover:text-primary">J'aime</li>
    </button>
    <button @click.prevent="fetchReactionsSystem(fromPost.post.id, 0, 'like')" v-if="liked != false" class="flex items-center mx-4 my-2 group">
        <li class="text-primary cursor-pointer group-hover:text-third"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></li>
        <li class="text-primary cursor-pointer ml-2 group-hover:text-third">{{ likes.length }}</li>
        <li class="text-primary cursor-pointer ml-2 group-hover:text-third">J'aime</li>
    </button>
</template>
