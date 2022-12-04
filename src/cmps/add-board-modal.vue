<template>
    <section class="add-board-modal" @click.stop="">
        <button class="btn-close" @click.stop="closeEdit">
            <span class="trellicons x-icon"></span>
        </button>
        <div class="title">Create board</div>
        <div class="mini-title">Colors</div>
        <div class="colors-pallet flex">
            <div v-for=" (color, i) in colorsPallet" :key="i" :style="{ backgroundColor: color }" class="color-sample"
                @click="updateCover(color)">

            </div>
            <div class="color-sample"></div>
        </div>
        <div class="mini-title">Attachments</div>
        <!-- <button class="btn-upload" @click="">Upload a cover image </button> -->

        <div class="mini-title">Photos from Unsplash</div>
        <div class="photos-container flex">
            <img v-for="index in 4" :key="index" :src="imgUrls[index]" @click="updateCover(imgUrls[index])">
        </div>

        <input type="text" placeholder="Search Photos..." @input="debounceHandler" v-model="searchTxt">
    </section>
</template>

<script>
import axios from 'axios'
import { utilService } from '../services/util.service';
import imgUploader from '../cmps/img-uploader.vue'
export default {
    data() {
        return {
            imageDownloadUrl: '',
            clientId: 'wONkEH1Be08ksV3ijwHHpfu8tfvmD6SnhsRpvZBWVgg',
            searchTxt: '',
            imgUrls: [],
            colorsPallet: ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5'],
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
        updateCover(value) {
            this.$emit('updateTask', value)
        },

        closeEdit() {
            this.$emit('closeEdit')
        },
    },
    computed: {

    }
}
</script>
