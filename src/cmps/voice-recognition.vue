<template>
    <section>
        <button>Record</button>
        <p>{{ transcript }}</p>
    </section>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
    data() {
        return {
            transcript: '',
        }
    },
    created() {
       const  recognition = window.SpeechRecognition || window.webkitSpeechRecognition
       const sr = new recognition
       sr.continuous = true
       sr.interimResults = true
    },
}
</script>
