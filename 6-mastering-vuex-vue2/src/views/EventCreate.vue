<template>
  <div>

    <h1>Create an event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ getEventById(2) }}</p>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
  // computed: mapState({
  //   userName: state => state.user.name,
  //   userID: state => state.user.id,
  //   categories: state => state.categories
  // })

  // simpler way to map states
  computed:{
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])}
}
</script>


<style scoped></style>