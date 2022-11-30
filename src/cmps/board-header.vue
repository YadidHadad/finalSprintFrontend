<template>
    <h1>{{ boardHeader }}</h1>
</template>



<script>
export default {
    name: 'board-header',
    props: {
        boardHeader: {
            type: String,
            required: true,
        }
    },
}
</script>

<style>

</style>