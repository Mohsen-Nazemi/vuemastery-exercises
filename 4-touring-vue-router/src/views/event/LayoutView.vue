<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'event-details' }">Details</router-link> |
            <router-link :to="{ name: 'event-register' }">Register</router-link> |
            <router-link :to="{ name: 'event-edit' }">Edit</router-link>
        </div>
        <RouterView :event="event" />
    </div>
</template>


<script>
import EventService from '@/services/EventService'
export default {
    props: ['id'],
    data() {
        return {
            event: null,
        }
    },
    created() {
        EventService.getEvent(this.id)
            .then(response => {
                this.event = response.data
            })
            .catch(error => {
                if (error.response && error.response.status == 404) {
                    this.$router.push({
                        name: '404-resource',
                        params: { resource: 'event' }
                    })
                } else {
                    this.$router.push({ name: 'network-error' })
                }
            })
    }
}

</script>

