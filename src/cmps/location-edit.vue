<template>
    <section class="location-edit task-editor" @click.stop="">
        <div class="location-edit-header">
            <button class="btn-close">
                <span class="trellicons location-icon" @click.stop="closeEdit"></span>
            </button>
            <div class="title ">
                Add location
            </div>

            <input type="search" list="locations" id="location" placeholder="Search Google Maps" v-model="locTxt"
                @input="debounceHandler" @keyup.enter="($event) => $event.target.blur()" v-focus>
            <div class="btn-remove" v-for="locCords in locsCords" :value="locCords.name"
                @click="updateLocation(locCords)">
                {{ locCords.name }}
            </div>
        </div>

        <!-- <datalist id="locations">
                <option v-for="locCords in locsCords" :value="locCords.name"></option>
            </datalist> -->
    </section>
</template>

<script>
import axios from 'axios'
import { utilService } from '../services/util.service'
export default {
    name: 'location-edit',
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
        // updateLocation(ev) {
        //     console.log(ev.target.value);
        //     const chosenLoc = this.locsCords.find(loc => {
        //         console.log(loc.name)
        //         console.log(ev.target.value)
        //         return loc.name === ev.target.value
        //     })
        //     console.log('chosen loc', chosenLoc);
        //     this.$emit('updateTask', chosenLoc.cords)
        // },
        updateLocation(locCords) {
            // console.log('dddddddddddddddddddddd', locCords);
            const chosenLoc = this.locsCords.find(loc => {
                // console.log(loc.name)
                // console.log(locCords)
                return loc.name === locCords.name
            })
            // console.log('****************chosen loc', chosenLoc);
            this.$emit('updateTask', chosenLoc)
            // this.$emit('updateTask', chosenLoc.cords)
        },
        getLocationByName() {
            if (!this.locTxt.trim()) return
            const locsUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.locTxt}&key=${this.API_KEY}&language=en`
            axios(locsUrl)
                .then(({ data }) => {
                    // console.log('data', data)
                    const topResults = data.results.slice(0, 5)
                    // console.log(topResults);
                    topResults.forEach(res => {
                        this.locsCords.push({ cords: res.geometry.location, name: res.formatted_address })
                    })
                    // console.log('this.locsCords', this.locsCords);
                })
                .catch((err) => {
                    console.log('Cant load locations', err);
                })
        },
    },
}
</script>