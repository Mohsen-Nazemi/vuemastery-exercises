<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">

      <BaseSelect :options="categories" v-model="event.category" label="Select a category" />

      <fieldset>

        <legend>Name & describe your event</legend>

        <BaseInput
          v-model="event.title"
          label="Title"
          type="text"
          error="This input has an error!"
         />

        <BaseInput v-model="event.description" label="Description" type="text" />

      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>

        <BaseInput v-model="event.location" label="Location" type="text" />
      </fieldset>


      <hr>

      <!-- <h4>{{ event }}</h4> -->
      <ul>
        <li v-for="(value, key) in event" :key="key"> {{ key }}: {{ value }}</li>
      </ul>
      <hr>

      <fieldset>

        <legend>Pets</legend>
        <p>Are pets allowed?</p>
        <div>
          <BaseRadioGroup v-model="event.pets" name="pets" :options="petOptions" />

        </div>

      </fieldset>

      <fieldset>
        <legend>Extras</legend>
        <div>
          <BaseCheckbox v-model="event.extras.catering" label="Catering" />
        </div>

        <div>
          <BaseCheckbox v-model="event.extras.music" label="Live music" />
        </div>
      </fieldset>


      <button class="button -fill-gradient" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false
        }
      },
      petOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  },
  methods: {
    sendForm() {
      axios.post(
        'https://my-json-server.typicode.com/Mohsen-Nazemi/vuemastery-exercises/events',
        this.event
      )
        .then(function (response) {
          console.log('Response:', response)
        })
        .catch(function (error) {
          console.log('Error:', error)
        })
    }
  }
}
</script>
