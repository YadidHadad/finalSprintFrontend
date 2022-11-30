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

import { utilService } from '../services/util.service'


export default {
    name: '',
    props: ['rgb'],
    components: {},
    created() {
        console.log(`rgb:`, this.rgb)
    },
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        headerBackground() {
            if (!this.rgb) return
            // return { backgroundColor: `rgb(${+this.rgb.value[0] + 40},${+this.rgb.value[1] + 40},${+this.rgb.value[2] + 40})` }
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, -40, 1) : utilService.getBCG(this.rgb.value, 40, 1)
        },
        buttonBackground() {
            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 30, 1) : utilService.getBCG(this.rgb.value, -30, 1)
        },

    },


}

</script>

