import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from './slices/trainerName.slice'

const store = configureStore({
    reducer:{
nameTrainer
    }

})

export default store 