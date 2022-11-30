<template>
    <section class="board-header flex row align-center">

        <h1>{{ title || 'Board Title' }}</h1>

        <button v-for="btn in btns" class="btn-nav" :class="{ isDark: rgb.isDark }">
            <span :class="btn.icon"></span>
            {{ btn.txt }}
        </button>
    </section>
</template>



<script>
export default {
    name: 'board-header',
    props: {
        title: {
            type: String,
            required: true,
        },
        rgb: {
            type: Object,
            required: true,
        }
    },


    data() {
        return {

            btns: [
                {
                    txt: 'Boards',
                    icon: 'fa-brands trello-icon'
                },
                {
                    txt: 'Members',
                    icon: 'fa-regular user-icon'
                },
                {
                    txt: 'Settings',
                    icon: 'fa-solid settings-icon'
                },
            ]
        }
    }


}
</script>

<style>

</style>