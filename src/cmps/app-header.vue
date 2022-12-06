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
        <section class="user-buttons flex row align-center gap" v-if="user">
            <div class="search-boards flex row align-center gap justify-around"
                :class="{ 'whiteBackground': isInputInFocus, isDark: isDark }">
                <svg v-if="isDark" class="icon" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" role="presentation">
                    <path
                        d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                        fill="white" fill-rule="evenodd"></path>
                </svg>
                <svg v-else-if="isInputInFocus" class="icon" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" role="presentation">
                    <path
                        d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                        fill="172b4d" fill-rule="evenodd"></path>
                </svg>
                <svg v-else class="icon" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" viewBox="0 0 24 24" role="presentation">
                    <path
                        d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                        fill="172b4d" fill-rule="evenodd"></path>
                </svg>
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
            <svg v-if="isDark" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" role="presentation" :class="{ isDark: isDark }">
                <path
                    d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
                    fill="white" fill-rule="evenodd"></path>
            </svg>
            <svg v-else xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" role="presentation" :class="{ isDark: isDark }">
                <path
                    d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
                    fill="172b4d" fill-rule="evenodd"></path>
            </svg>
            <svg v-if="isDark" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" role="presentation"
                focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="white"
                    d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z">
                </path>
            </svg>
            <svg v-else xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" role="presentation"
                focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="172b4d"
                    d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z">
                </path>
            </svg>
            <div v-if="user.imgUrl" class="member-image" :style="memberImage(user.imgUrl)" @click="(showUserPreview = !showUserPreview)"> </div>
            <div v-else class="member-initials">
                {{ getInitials(user.fullname) }}
            </div>
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
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        headerBackground() {
            if (!this.rgb) return
            // return { backgroundColor: `rgb(${+this.rgb.value[0] + 40},${+this.rgb.value[1] + 40},${+this.rgb.value[2] + 40})` }
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


        }

    },
    components: { userPreview }


}

</script>

