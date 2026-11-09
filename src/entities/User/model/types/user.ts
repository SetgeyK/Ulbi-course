import { FeaturesFlags } from '@/shared/types/featuresFlags';

import { UserRole } from '../consts/consts';

export interface User {
    id: string;
    username: string;
    token?: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeaturesFlags;
}

export interface UserSchema {
    authData?: User;

    _inited?: boolean;
}
