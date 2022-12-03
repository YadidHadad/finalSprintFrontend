<template>
    <section class="labels-preview  flex column">
        <span class="title">Labels</span>
        <section class="labels-container flex row align-center justify-center">
            <div v-for="(label, i) in taskLabels" :key="i" :style="{ backgroundColor: label.color }"
                class="label-preview flex row align-center justify-center">
                <div :style="{ backgroundColor: label.color }" class="color-circle"></div>
                <span>{{ label.title }}</span>
            </div>
            <div class="btn-plus flex justify-center align-center">
                <span class="fa-regular plus-icon"></span>
            </div>
        </section>
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