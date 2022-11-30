<template>
    <h1>{{ title || 'Board Title' }}</h1>
</template>



<script>
export default {
    name: 'board-header',
    props: {
        title: {
            type: String,
            required: true,
        }
    },
}
</script>

<style>

</style>