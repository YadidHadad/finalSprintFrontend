<template>
    <header class="app-header" :style="headerBackground" :class="{ isDark: isDark }">
        <section class="flex row align-center">
            <router-link class="header-btn" :to="'/'" :class="{ isDark: isDark }">
                <span class="fa-brands trello-icon "></span>
            </router-link>
            <router-link class="header-btn" :to="'/board'" :class="{ isDark: isDark }">
                <span class="logo">Kannban</span>
            </router-link>
        </section>
        <section class="user-buttons flex row align-center gap">
            <div class="search-boards flex row align-center gap justify-around"
                :class="{ 'whiteBackground': isInputInFocus, isDark: isDark }">
                <span class="trello-home glass-icon"></span>

                <input type="search" v-model="filterByTitle" placeholder="Search" @focus="(isInputInFocus = true)"
                    v-click-outside="outOfFocus">
                <div v-if="isInputInFocus" class="search-results flex column">
                    <div class="title">RECENT BOARDS</div>
                    <router-link v-for="board in boards" :key="board._id" :to="('/board/' + board._id)"
                        class="search-result flex row align-center gap">
                        <img v-if="board.style.backgroundImage" class="" :src="board.style.backgroundImage" />
                        <div v-else :src="board.style.bgColor"></div>
                        <span>{{ board.title }}</span>
                        <span>Trello workspace</span>

                    </router-link>
                </div>
            </div>
            <span class="trello-home bell-icon"></span>
            <span class="trello-home question-icon"></span>

            <div v-if="user?.imgUrl" class="member-image" :style="memberImage(user.imgUrl)"
                @click="(showUserPreview = !showUserPreview)"> </div>
            <div v-if="user?.bgColor" class="member-initials">
                {{ getInitials(user.fullname) }}
            </div>
        </section>

        <user-preview v-if="showUserPreview" :user="user" v-click-outside="closeUserPreview" @logout="logout" />
    </header>
</template>


<script>

import { router } from '../router'
import { utilService } from '../services/util.service'

import userPreview from './user-preview.vue'
export default {
    name: 'app-header',
    props: ['rgb'],
    components: {},
    created() {
        console.log(this.isDefaultBGC)
    },
    data() {
        return {
            showUserPreview: false,
            isInputInFocus: false,
            filterByTitle: '',
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
        },
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        getInitials(fullname) {
            return utilService.getInitials(fullname)
        },
        changeDivStyle() {
            console.log('focus')
            this.isInputInFocus = true
        },
        outOfFocus() {
            this.isInputInFocus = false
        }

    },
    computed: {
        isDark() {
            if (this.isDefaultBGC) {
                return true
            }
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        headerBackground() {
            if (this.isDefaultBGC) {
                return { backgroundColor: '#026aa7' }
            }

            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, -20, 1) : utilService.getBCG(this.rgb.value, +30, 1)
        },
        buttonBackground() {
            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 30, 0.5) : utilService.getBCG(this.rgb.value, 60, 0.5)
        },
        user() {
            return this.$store.getters.loggedinUser
        },
        boards() {

            const boards = this.$store.getters.boards

            if (!this.filterByTitle) return boards

            const regex = new RegExp(this.filterByTitle, 'i');

            return boards.filter(board => regex.test(board.title))


        },
        isDefaultBGC() {
            console.log(this.$route.params)
            if (!this.$route.params?.id) return true
            else return false
        }

    },
    watch: {
        isDefaultBGC() {
            console.log(this.isDefaultBGC)
            this.headerBackground

        }

    },
    components: { userPreview }


}

</script>

