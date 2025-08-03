import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DocComment {
  id: string;
  text: string;
  comment: string;
  from: number;
  to: number;
  selection: string;
  user: {
    name: string;
    color: string;
    avatar?: string;
  }
  documentId: string;
}

interface CommentsState {
  list: DocComment[];
  comments: undefined;
}

const initialState: CommentsState = {
  list: [],
  comments: undefined,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<DocComment>) => {
      state.list.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    clearComments: (state) => {
      state.list = [];
    },
  },
});

export const { addComment, removeComment, clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
