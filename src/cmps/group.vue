<template>
    <div class="group flex column">
        <h1>{{ group.title }}</h1>
    </div>
</template>

<script>
export default {
    props: {
        group: {
            type: Object,
            required: true
        }
    }
}
</script>

