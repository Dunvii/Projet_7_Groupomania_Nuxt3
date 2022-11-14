<script setup lang="ts">

const userInfos = useCookie('userInfos');

const fromCommentPart = defineProps({ 
    comment: {
        type:Object,
        required: true
    },

})

const data = reactive({
    editComment : false,
    content: fromCommentPart.comment.content,
})

const emit = defineEmits(['refreshComments']);


async function fetchModifyComment() {
    data.editComment = false;
    await modifyComment(fromCommentPart.comment.id, data.content);
    emit('refreshComments');
}

async function fetchDeleteComment() {
    await deleteComment(fromCommentPart.comment.id);
    emit('refreshComments');
}

</script>
<template lang="">
    <hr class="mx-2"/>
        <div class="flex flex-col mx-4 my-4">
            <div class="flex items-center my-2">
                <font-awesome-icon icon="fa-solid fa-circle-user" class="mr-4 text-xl text-third hover:text-primary"/>
                <span><img :src="fromCommentPart.comment.User.avatarUrl" class="rounded-full h-6 w-6 mr-4"></span>
                <h3 class="text-sm">{{ fromCommentPart.comment.User.firstName }} {{ fromCommentPart.comment.User.lastName }}</h3>
            </div>
            <div class="flex">
                <div class="flex flex-col">
                   <button v-on:click="data.editComment = !data.editComment" v-if="userInfos.id == fromCommentPart.comment.UserId || userInfos.admin == true"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-4 text-xl mb-2 text-third hover:text-primary"/></button>
        <!-- MISS TO ADD DELETE ACTION -->
                   <button v-on:click="fetchDeleteComment()" v-if="userInfos.id == fromCommentPart.comment.UserId || userInfos.admin == true"><font-awesome-icon icon="fa-solid fa-trash" class="mr-4 text-xl mb-2 text-third hover:text-primary"/></button>
                </div>
                <div v-if="!data.editComment" class="flex">
                    <p>{{ data.content }}</p>
                </div>
                <div v-if="data.editComment" class="flex w-full mb-4 gap-2 items-center">
                    <textarea v-model="data.content" maxlength="500" class="resize-none w-full h-fit focus:outline-none border border-third/20 rounded-lg shadow-lg "></textarea>
                    <button v-if="fromCommentPart.comment.content != data.content" v-on:click="fetchModifyComment()" class="flex items-center button-valid h-fit w-fit"><font-awesome-icon icon="fa-solid fa-check" /></button>
                </div>
            </div>
        </div>
</template>
