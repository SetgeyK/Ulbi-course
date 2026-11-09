import { FeaturesFlags } from '@/shared/types/featuresFlags';

let featuresFlags: FeaturesFlags;

export function setFeaturesFlags(newFeatureFlags: FeaturesFlags) {
    if (newFeatureFlags) {
        featuresFlags = newFeatureFlags;
    }
}

export function getFeaturesFlag(flag: keyof FeaturesFlags) {
    return featuresFlags[flag];
}
