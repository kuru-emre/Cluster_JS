import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { chartReducer, tableReducer } from "./slices";

const reducers = combineReducers({
    chart: chartReducer,
    table: tableReducer
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
