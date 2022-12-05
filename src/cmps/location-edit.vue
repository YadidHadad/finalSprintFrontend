<template>
    <section class="location-edit">
        <div class="location-edit-header">
            <button class="btn-close">
                <span class="trellicons location-icon" @click.stop="closeEdit"></span>
            </button>
            <div class="title flex justify-between">
                <span>Add location</span>
            </div>

            <input type="search" list="locations" id="location" placeholder="Search Google Maps" v-model="locTxt"
                @input="debounceHandler" @change="updateLocation">

            <datalist id="locations">
                <option v-for="locCords in locsCords" :value="locCords.name"></option>
            </datalist>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import { utilService } from '../services/util.service'
export default {
    data() {
        return {
            locTxt: '',
            API_KEY: 'AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw',
            locsCords: []
        }
    },
    created() {
        this.debounceHandler = utilService.debounce(this.getLocationByName, 1000)
        this.debounceHandler()
    },

    methods: {
        updateLocation(ev) {
            console.log(ev.target.value);
            const chosenLoc = this.locsCords.find(loc => loc.name === ev.target.value)
            console.log(chosenLoc , '0000000000');
            this.$emit('updateTask', chosenLoc.cords)
        },
        getLocationByName() {
            if (!this.locTxt.trim()) return
            const locsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.locTxt}&key=${this.API_KEY}`
            axios(locsUrl)
                .then(({ data }) => {
                    const topResults = data.results.slice(0, 5)
                    console.log(topResults);
                    topResults.forEach(res => {
                        this.locsCords.push({ cords: res.geometry.location, name: res.formatted_address })
                    })
                    console.log(this.locsCords);
                })
                .catch((err) => {
                    console.log('Cant load locations', err);
                })
        },
    },
}
</script>