import { rootMiddleware } from "@/redux/store/middlewares"
import rootReducers from "@/redux/reducers"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(rootMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
