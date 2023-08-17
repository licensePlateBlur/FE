import { configureStore } from '@reduxjs/toolkit'

import { FileSlice } from './photo'


const store = configureStore({
    reducer: {
        file : FileSlice.reducer //여기서 RootState의 이름이 된다 file : FileState -> reducer 초기값 해당 FileState를 store에 저장한다.
    },
  })
export default store

export type RootState = ReturnType<typeof store.getState>

