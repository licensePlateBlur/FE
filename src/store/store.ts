import { configureStore } from '@reduxjs/toolkit'
import { GetInfoReducer } from './coordinate'

export default configureStore({
    reducer: {
        // data : GetInfoReducer,
    },
  })