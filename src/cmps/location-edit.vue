<template>
    <section class="location-edit">
        <div class="location-edit-header">
            <button class="btn-close">
                <span class="trellicons location-icon" @click.stop="closeEdit"></span>
            </button>
            <div class="title flex justify-between">
                <span>Add location</span>
            </div>

            <input type="text" placeholder="Search Google Maps">
            <div>
                <button @click="updateLocation">Add</button>
            </div>
        </div>
    </section>
</template>

<script>

export default {

    methods: {
        updateLocation() {
            this.$emit('updateTask', { lat: 32.0853, lng: 34.7818 })
        }
    },
}
</script>