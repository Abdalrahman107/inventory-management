import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/state/index"
import { api } from "@/state/api";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { setupListeners } from "@reduxjs/toolkit/query";
import persistStore from "redux-persist/es/persistStore";

const createNoopStorage = () => {
    return {
      getItem(_key: any) {
        return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: any) {
        return Promise.resolve();
      },
    };
  };
  
  const storage =
    typeof window === "undefined" 
      ? createNoopStorage()
      : createWebStorage("local");


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['global']
  }

  const rootReducer = combineReducers({
    global: globalReducer,
    [ api.reducerPath ] : api.reducer
})
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () =>{
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              }
            }).concat(api.middleware),
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



export default function StoreProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
      
      storeRef.current = makeStore();
      setupListeners(storeRef.current.dispatch);
    }
    const persistor = persistStore(storeRef.current);

    return <Provider store={storeRef.current}>
        
        <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>

    </Provider>
  }