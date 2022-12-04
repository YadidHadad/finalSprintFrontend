<template>
    <section class="location-preview">


        <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 100%" :center="center"
            :zoom="10">
            <Marker v-for="m in markers" :options="m" @click="center = m.position" />
        </GoogleMap>

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
        console.log(this.center, this.location, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        const marker = {
            title: 'Tel-Aviv',
            label: 'Hi!',
            position: this.location

        }
        this.markers.push(marker)
    },
}
</script>