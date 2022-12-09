<template>
  <GoogleMap api-key="AIzaSyAV_zVjXKofPeV5nwAzfNKJ7Gt4VEMjHOw" style="width: 100%; height: 100%" :center="center"
    :zoom="3" :controlSize="20" :styles="styles">
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
      styles: [
        {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#444444"
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#e0dfe0"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#a8a9a8"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#5b5b5a"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#ffffff"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]

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
