<template>
    <section class="add-board-modal" @click.stop="">
        <div class="created-board-header">
            <button class="btn-close" @click.stop="closeEdit">
                <span class="trellicons x-icon"></span>
            </button>
            <div class="title">Create board</div>
        </div>

        <input type="text" v-model="title" v-focus>
        <div class="mini-title">Background</div>
        <div class="photos-container flex">
            <img v-for="index in 4" :key="index" :src="imgUrls[index]" @click="updateCover(imgUrls[index])">
        </div>
        <div class="colors-pallet flex">
            <div v-for=" color in colorsPallet" :key="color" :style="{ backgroundColor: color }" class="color-sample"
                @click="updateCover(color)">

            </div>
            <div class="color-sample">...</div>
        </div>
        <input type="text" placeholder="Search Photos..." @input="debounceHandler" v-model="searchTxt">

        <button @click="addBoard">Create</button>
    </section>
</template>

<script>
import axios from 'axios'
import { utilService } from '../services/util.service';
import imgUploader from '../cmps/img-uploader.vue'
export default {
    name: 'add-board-moadl',
    data() {
        return {
            imageDownloadUrl: '',
            clientId: 'wONkEH1Be08ksV3ijwHHpfu8tfvmD6SnhsRpvZBWVgg',
            searchTxt: '',
            imgUrls: [],
            colorsPallet: ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5'],
            title: '',
            bcg: ''
        }
    },
    components: {
        imgUploader
    },
    created() {
        this.debounceHandler = utilService.debounce(this.getPhotos, 600)
        this.debounceHandler()
    },
    methods: {
        getPhotos() {
            const key = 'unsplashDB'

            if (!localStorage.getItem(key))
                console.log(this.searchTxt);
            let apiUrl = `https://api.unsplash.com/search/photos?query=${this.searchTxt ? this.searchTxt : 'pretty'}&per_page=1200&client_id=${this.clientId}`
            axios(apiUrl).then(({ data }) => {
                this.imgUrls = data.results.map(res => res.urls.full).slice(0, 12)
                // console.log(this.imgUrls);
            })
        },
        updateCover(background) {
            this.bcg = background
        },

        closeEdit() {
            this.$emit('closeEdit')
        },
        addBoard() {
            this.$emit('addBoard', { title: this.title, bcg: this.bcg })
        }
    },
    computed: {

    }
}
</script>
