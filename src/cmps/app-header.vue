<template>
    <header class="app-header" :style="headerBackground" :class="{ isDark: isDark }">
        <section class="flex">
            <router-link :to="'/'">
                <button class="header-btn">
                    <span class="fa-brands trello-icon "></span>
                    <span class="logo">Kanban</span>
                </button>
            </router-link>
            <button class="create-btn" :style="buttonBackground">
                Create
            </button>
        </section>
        <section class="user-buttons">
            <span v-if="user" class="btn flex row profile-btn" @click="(showUserPreview = !showUserPreview)">
                {{ getInitials(user.fullname) }}
            </span>
        </section>

        <user-preview v-if="showUserPreview" :user="user" v-click-outside="closeUserPreview" @logout="logout" />
    </header>
</template>
<script>

import { utilService } from '../services/util.service'

import userPreview from './user-preview.vue'
export default {
    name: 'app-header',
    props: ['rgb'],
    components: {},
    created() {
    },
    data() {
        return {
            showUserPreview: false
        }
    },
    methods: {
        getInitials(fullname = 'Guest') {
            return utilService.getInitials(fullname)
        },
        logout() {
            this.$emit('logout')
            this.showUserPreview = false
        },
        closeUserPreview() {
            this.showUserPreview = false
        }
    },
    computed: {
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        headerBackground() {
            if (!this.rgb) return
            // return { backgroundColor: `rgb(${+this.rgb.value[0] + 40},${+this.rgb.value[1] + 40},${+this.rgb.value[2] + 40})` }
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, -20, 1) : utilService.getBCG(this.rgb.value, +20, 1)
        },
        buttonBackground() {
            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 30, 0.5) : utilService.getBCG(this.rgb.value, 60, 0.5)
        },
        user() {
            return this.$store.getters.loggedinUser
        },


    },
    components: { userPreview }


}

</script>

