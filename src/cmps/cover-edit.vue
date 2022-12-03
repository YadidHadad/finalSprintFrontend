<template>
    <section class="task-editor cover-edit" @click.stop="">
        <button class="btn-close" @click.stop="closeEdit">
            <span class="trellicons x-icon"></span>
        </button>
        <div class="title">Unsplash</div>
        <div class="photos-container flex justify-between  wrap">
            <img v-for="index in 12" :key="index" :src="imgUrls[index]" @click="updateCover(imgUrls[index])">
        </div>

        <input type="text" placeholder="Search Photos..." @input="debounceHandler" v-model="searchTxt">
    </section>
</template>

<script>
import axios from 'axios'
import { utilService } from '../services/util.service';
export default {
    data() {
        return {
            imageDownloadUrl: '',
            clientId: 'wONkEH1Be08ksV3ijwHHpfu8tfvmD6SnhsRpvZBWVgg',
            searchTxt: '',
            imgUrls: []
        }
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
        updateCover(imgUrl) {
            this.$emit('updateTask', imgUrl)
        },
        closeEdit() {
            this.$emit('closeEdit')
        },
    },
    computed: {

    }
}
</script>
