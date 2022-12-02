<template>
    <section class="task-description task-cmp flex column ">
        <div class="flex row align-center">

            <span class="trellicons desc-icon large"></span>
            <div class="task-cmp-title grow">Description</div>
        </div>
        <!-- <div class="flex column "> -->
        <textarea class="pad-40" placeholder="Add a more detailed description..."></textarea>
        <!-- </div> -->
        <!-- <div class="desc-btns">
            <button class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
        </div> -->
    </section>
</template>

<script>
export default {
    name: 'task-description',
    props: ['description'],
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
}
</script>
