<template>
    <section class="checklist-preview">
        <div v-for="checklist in checklists">
            {{checklist.title}}
        </div>
        <span>+</span>
    </section>
</template>

<script>
export default {
    props: {
        checklists: {
            type: Array,
            required: true,
        }
    },
    created() {
        
    },
}
</script>