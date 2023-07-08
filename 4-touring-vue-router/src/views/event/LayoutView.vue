<template>
    <div v-if="GStore.event">
        <h1>{{ GStore.event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'event-details' }">Details</router-link> |
            <router-link :to="{ name: 'event-register' }">Register</router-link> |
            <router-link :to="{ name: 'event-edit' }">Edit</router-link>
        </div>
        <RouterView :event="GStore.event" />
    </div>
</template>


<script>
export default {
  inject: ['GStore']
}

</script>

