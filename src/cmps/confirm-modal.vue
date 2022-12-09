<template>
    <section class="confirm-modal">
        <div class="confirm-modal-header">
            <h2>{{msg}}</h2>
            <!-- <button class="btn-close" @click.stop="closeEdit">
                <span class="trellicons x-icon"></span>
            </button> -->
        </div>
        <button class="delete-btn" @click="remove">Delete</button>
    </section>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            required: true
        },
    },
    methods: {
        remove() {
            this.$emit('remove')
        }
    },
}
</script>