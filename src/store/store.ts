import { configureStore } from '@reduxjs/toolkit'

import { FileSlice as  PhotoSlice} from './photo'
import { FileSlice as VideoSlice} from './video'


const store = configureStore({
    reducer: {
        file : PhotoSlice.reducer, //여기서 RootState의 이름이 된다 file : FileState -> reducer 초기값 해당 FileState를 store에 저장한다.
        video : VideoSlice.reducer 
    },
  })
export default store

export type RootState = ReturnType<typeof store.getState>

