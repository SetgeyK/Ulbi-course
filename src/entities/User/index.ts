import { UserRole } from './model/consts/consts';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';
import { useJsonSettings } from './model/selectors/jsonSettings';
import { isUserAdmin, isUserManager, getUserRoles } from './model/selectors/roleSelectors';
import { initAuthData } from './model/services/iniAuthData';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { userActions, userReducer } from './model/slice/userSlice';

import type { User, UserSchema } from './model/types/user';

export {
    userActions,
    userReducer,
    getUserAuthData,
    getUserInited,
    getUserRoles,
    useJsonSettings,
    User,
    UserSchema,
    UserRole,
    isUserAdmin,
    isUserManager,
    saveJsonSettings,
    initAuthData,
};
