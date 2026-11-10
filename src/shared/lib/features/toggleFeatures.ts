import { FeaturesFlags } from '@/shared/types/featuresFlags';

import { getFeaturesFlag } from './setGetFeatures';

interface ToggleFeatures<T> {
    name: keyof FeaturesFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>({ name, on, off }: ToggleFeatures<T>): T {
    if (getFeaturesFlag(name)) {
        return on();
    }
    return off();
}
