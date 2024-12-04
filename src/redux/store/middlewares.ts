import { adminDataApi } from "@/redux/services/admin/data.api"
import { adminModelApi } from "@/redux/services/admin/model.api"
import { adminUserApi } from "@/redux/services/admin/user.api"
import { userModelApi } from "@/redux/services/client/model.api"
import { userRecordApi } from "@/redux/services/client/record.api"
import { userSpectraApi } from "@/redux/services/client/spectra.api"
import { userApi } from "@/redux/services/client/user.api"

export const rootMiddleware = [
    userApi.middleware,
    userSpectraApi.middleware,
    userModelApi.middleware,
    userRecordApi.middleware,
    adminUserApi.middleware,
    adminDataApi.middleware,
    adminModelApi.middleware,
]
