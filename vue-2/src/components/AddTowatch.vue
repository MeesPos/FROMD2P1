<template>
    <div class="container">
        <form @submit="addMovie">
        <div class="input-group flex-nowrap mb-3">
            <input type="text" class="form-control" name="movieName" placeholder="Naam van de film/serie" aria-label="Naam van de film/serie" aria-describedby="addon-wrapping" v-model="title">
        </div>

        <div class="input-group flex-nowrap mb-3">
            <input type="text" class="form-control" placeholder="Afbeelding van de film/serie" aria-label="Afbeelding van de film/serie" aria-describedby="addon-wrapping" v-model="image">
        </div>

        <div class="input-group flex-nowrap mb-3">
            <input type="text" class="form-control" placeholder="Plek om de film/serie te kijken" aria-label="Plek om de film/serie te kijken" aria-describedby="addon-wrapping" v-model="place">
        </div>

        <div class="input-group flex-nowrap mb-3">
            <input type="submit" value="Toevoegen" class="btn">
        </div>
        </form>
    </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';

export default {
    name: 'AddTowatch',
    data() {
        return {
            title: '',
            image: '',
            place: ''
        }
    },
    methods: {
        addMovie(e) {
            e.preventDefault();
            const newTowatch = {
                id: uuidv4(),
                title: this.title,
                image: this.image,
                place: this.place,
                completed: false
            } 
            this.$emit('add-towatch', newTowatch);

            this.title = '';
            this.image = '';
            this.place = '';
        }
    }
}
</script>

<style scoped>

</style>