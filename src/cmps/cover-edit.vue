<template>
    <section class="cover-edit">
        <div class="photos-container">
            <img v-for="index in 10" :key="index" :src="imgUrls[index - 1]" @click="updateCover(imgUrls[index])">
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
            console.log(this.searchTxt);
            let apiUrl = `https://api.unsplash.com/search/photos?query=${this.searchTxt ? this.searchTxt : 'pretty'}&per_page=1200&client_id=${this.clientId}`
            axios(apiUrl).then(({ data }) => {
                this.imgUrls = data.results.map(res => res.urls.full).slice(0, 10)
                // console.log(this.imgUrls);
            })
        },
        updateCover(imgUrl) {
            this.$emit('updateTask' , imgUrl)
        }
    },
    computed: {

    }
}
</script>
