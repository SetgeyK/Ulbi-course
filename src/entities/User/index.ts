import { User, UserSchema } from './model/types/user';
import { userActions, userReducer } from './model/slice/userSlice';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';

export {
    userActions,
    userReducer,
    getUserAuthData,
    getUserInited,
    User,
    UserSchema
}