import { ProfileSchema, Profile } from './model/types/profile'
import { profileActions, profileReducer } from './model/slice/ProfileSlice'
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData'
import { ProfileCard } from './ui/ProfileCard/ProfileCard'

export {
    Profile,
    ProfileSchema,
    profileReducer,
    profileActions,
    fetchProfileData,
    ProfileCard
}