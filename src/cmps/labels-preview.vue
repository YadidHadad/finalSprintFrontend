<template>
    <section class="labels-preview">
        <div v-for="label in labels" :style="{ backgroundColor: label.color }">
        </div>
        <span>+</span>
    </section>
</template>

<script>
export default {
    props: {
        labels: {
            type: Array,
            required: true,
        }
    },
    created() {
    },
}
</script>