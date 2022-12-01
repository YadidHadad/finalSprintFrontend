<template>
    <section class="labels-preview">
        <div v-for="label in labels" :style="{ backgroundColor: label.color }">
            <span>{{ label.title }}</span>
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
        console.log(this.labels)
    },
}
</script>