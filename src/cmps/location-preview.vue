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
                // {
                //     title: 'Tel-Aviv',
                //     label: 'Hi!',
                //     position: { lat: 32.0853, lng: 34.7818 },
                // },
                // {
                //     title: 'Jerusalem',
                //     position: { lat: 31.7683, lng: 35.2137 },
                // },
                // {
                //     title: 'Rehovot',
                //     position: { lat: 31.8928, lng: 34.8113 },
                // },
            ],
        }
    },
    created() {
        this.center =  this.location
        console.log(this.center , this.location , '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        const marker = {
            title: 'Tel-Aviv',
            label: 'Hi!',
            position: this.location

        }
        this.markers.push(marker)
    },
}
</script>