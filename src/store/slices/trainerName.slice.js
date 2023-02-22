import { createSlice } from "@reduxjs/toolkit";

const nameTrainerSlice = createSlice ( {
    name: 'nameTrainer',
    initialState:'',
    reducers: {
                setNameTrainer: (state, action) => action.payload
    }
})

export default nameTrainerSlice.reducer;

export  const {setNameTrainer} = nameTrainerSlice.actions
                                 /*aqui están todas las action, y a este objeto lo desestructuramos para exportarlo */