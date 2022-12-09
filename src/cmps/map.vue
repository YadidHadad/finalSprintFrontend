<template>
  <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 100%" :center="center"
    :zoom="3" :controlSize="20">
    <MarkerCluster>
      <Marker v-for="(location, i) in locations" :options="{ position: location.position, title: location.title }"
        :key="i">
        <!-- <Marker :options="markerOptions"> -->
        <InfoWindow>
          <div id="content">
            <div id="siteNotice"></div>
            <h1 id="firstHeading" class="firstHeading">{{ location.taskTitle }}</h1>
            <div id="bodyContent">
              <p>{{ location.taskDesc }}</p>
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </MarkerCluster>
  </GoogleMap>
</template>
<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker, InfoWindow, MarkerCluster } from "vue3-google-map";
export default {
  name: '',
  props: [],
  components: { GoogleMap, Marker, InfoWindow, MarkerCluster },
  created() {

  },
  data() {
    return {
      center: { lat: 35.509865, lng: -20.118092 },

    };
  },
  methods: {},
  computed: {
    locations() {
      const board = this.$store.getters.board

      const locations = []
      board.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.location) {

            locations.push({ ...task })
          }
        })
      });

      // return locations
      console.log(locations)
    },

  },
  computed: {
    locations() {
      const board = this.$store.getters.board

      const locations = []
      board.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.location) {
            const location = {

              'position': task.location.cords,
              'title': task.location.name,
              taskTitle: task.title,
              taskDesc: task.description
            }

            locations.push(location)
          }
        })
      });
      return locations
    },
  },
}
</script>
