<template>
    <section class="labels-preview">
        <div v-for="label in taskLabels" :style="{ backgroundColor: label.color }" class="label-preview">
            <div :style="{ backgroundColor: label.color }" class="color-circle"></div>
            <span>{{ label.title }}</span>
        </div>
        <span>+</span>
    </section>
</template>

<script>
export default {
    computed: {
        taskLabels() {
            console.log(this.$store.getters.taskLabels);
            return this.$store.getters.taskLabels
        }
    }
}
</script>