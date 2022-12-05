<template>
    <section class="location-preview">
        <div class="flex row w-100 align-center ">
            <span class="trellicons location-icon large "></span>
            <div class="task-cmp-title grow">Location</div>
        </div>
        <div class="map-container">

            <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 100%"
                :center="location" :zoom="10">
                <Marker :options="{ position: location }" @click="center = location" />
            </GoogleMap>
        </div>

    </section>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'
export default {
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
}
</script>