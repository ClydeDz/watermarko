import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filename: 'watermarko.png',
}

export const imageSlice = createSlice({
  name: 'imageSlice',
  initialState,
  reducers: {
    setFilename: (state, action) => {
      state.filename = action.payload
    },
  },
})

export const { setFilename } = imageSlice.actions

export default imageSlice.reducer