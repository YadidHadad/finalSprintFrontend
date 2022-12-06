<template>
    <section class="location-preview">
        <div class="flex row w-100 align-center ">
            <span class="trellicons location-icon large "></span>
            <div class="task-cmp-title grow">Location</div>
        </div>
        <div class="map-container">

            <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 100%"
                :center="location" :zoom="14">
                <Marker :options="{ position: location }" @click="center = location" />

            </GoogleMap>
            <div class="location-preview-footer">
                <div class="actions">
                    <span class="trellicons external-link-icon"></span>
                    <span class="fa-solid elipsis-icon" @click="isOpenOptions = true"></span>
                    <button v-if="isOpenOptions" v-click-outside="() => isOpenOptions = false"
                        @click="remove">Delete</button>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import { remove } from '@vue/shared'
import { GoogleMap, Marker, CustomMarker } from 'vue3-google-map'
export default {
    name: 'location-preview',
    props: {
        location: {
            type: Object,
            required: true,
        },
    },
    components: { GoogleMap, Marker },
    data() {
        return {
            center: {},
            markers: [
            ],
            isOpenOptions: false,
        }
    },
    created() {
        this.center = this.location
        // console.log(this.center, this.location, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        const marker = {
            title: '',
            label: '',
            position: this.location

        }
        this.markers.push(marker)
    },
    methods: {
        remove() {
            this.$emit('removeLocation')
        }
    },
}
</script>