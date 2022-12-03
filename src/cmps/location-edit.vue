<template>
    <section class="location-edit">
        <div class="location-edit-header">
            <button class="btn-close">
                <span class="trellicons x-icon" @click.stop="closeEdit"></span>
            </button>
            <div class="title flex justify-between">
                <span>Add location</span>
            </div>

            <input type="text" placeholder="Search Google Maps">
        </div>
    </section>
</template>

<script>
export default {

}
</script>