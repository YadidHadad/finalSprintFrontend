<template>
    <section class="board-menu flex column" :class="{ menuIsHidden: menuIsHidden }">
        <button class="btn" @click="toggleBoardMenu">
            <span class="fa-solid x-icon"></span>
        </button>
        <span class="title">Menu</span>

        <button v-for="btn in btns" class="btn">
            <span :class="btn.icon"></span>
            <span>{{ btn.txt }}</span>
        </button>
    </section>
</template>
<script>
export default {
    name: 'board-menu',
    props: ['menuIsHidden'],
    components: {},
    created() { },
    data() {
        return {
            btns: [
                {
                    txt: 'About this board',
                    icon: 'fa-brands trello-icon'
                },
                {
                    txt: 'Change background',
                    icon: 'fa-regular user-icon'
                },
                {
                    txt: 'Activity',
                    icon: 'fa-solid settings-icon'
                },
            ]
        }
    },
    methods: {
        toggleBoardMenu() {
            console.log('A')
            this.$emit('toggleBoardMenu', this.toggleBoardMenu)

        }
    },
    computed: {},
}
</script>
