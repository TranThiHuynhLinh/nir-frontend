import { combineReducers } from "redux"
import { userApi } from "@/redux/services/client/user.api"
import { adminUserApi } from "@/redux/services/admin/user.api"
import { adminDataApi } from "@/redux/services/admin/data.api"
import { userSpectraApi } from "@/redux/services/client/spectra.api"
import { userModelApi } from "@/redux/services/client/model.api"
import { userRecordApi } from "@/redux/services/client/record.api"
import { adminModelApi } from "@/redux/services/admin/model.api"

const rootReducers = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [userSpectraApi.reducerPath]: userSpectraApi.reducer,
    [userModelApi.reducerPath]: userModelApi.reducer,
    [userRecordApi.reducerPath]: userRecordApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
    [adminDataApi.reducerPath]: adminDataApi.reducer,
    [adminModelApi.reducerPath]: adminModelApi.reducer,
})

export default rootReducers
