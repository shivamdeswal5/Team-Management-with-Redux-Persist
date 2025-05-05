import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/user/userSlice';
import TeamReducer from './slices/team/teamSlice'
import ProjectReducer from './slices/project/projectSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','team','project'] // only navigation will be persisted
}

const rootReducer = combineReducers({
    user: UserReducer,
    team: TeamReducer,
    project: ProjectReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer: persistedReducer,

});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const persistor = persistStore(store);
