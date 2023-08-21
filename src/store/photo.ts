import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface FileState {
  filename: string;
}
// 예시 파일 데이터
const initialState: FileState = { filename: '' }; //reducer의 데이터 타입이 이거이기 때문이다.

// reducer를 쪼개논것
export const FileSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    //리덕스의 함수가 createAction을 대체한다.
    getfilename(state, action: PayloadAction<string>) {
      //state를 initialState 값을 가져온다
      state.filename = action.payload; //state가 변경되면 자동으로 reducer에서 리턴해준다.
    },
  },
});

export const { getfilename } = FileSlice.actions;

export default FileSlice.reducer;
