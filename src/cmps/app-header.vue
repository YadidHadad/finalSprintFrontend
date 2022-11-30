<template>
    <header class="app-header" :style="headerBackground" :class="{ isDark: isDark }">
        <section class="flex">
            <button class="header-btn">
                <span class="fa-solid grid-icon"></span>
            </button>
            <button class="header-btn">
                <span class="fa-brands trello-icon "></span>
                <span class="logo">Kanban</span>
            </button>
            <button class="create-btn" :style="buttonBackground">
                Create
            </button>
        </section>

        <section class="user-buttons">


        </section>



    </header>
</template>
<script>



export default {
    name: '',
    props: ['color'],
    components: {},
    created() {
        console.log(`color:`, this.color)
    },
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        headerBackground() {
            if (!this.color) return
            return { backgroundColor: this.color.rgb }
        },
        buttonBackground() {
            if (!this.color) return
            return this.color.isDark ? { backgroundColor: this.color.rgb, filter: 'brightness(50%)' } : { backgroundColor: this.color.rgb, filter: 'brightness(85%)' }
        },
        isDark() {
            if (!this.color) return false
            return this.color.isDark
        }
    },
}
</script>

