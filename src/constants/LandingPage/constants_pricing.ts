import {
    PRICING_FREE_NAME,
    PRICING_FREE_PRICE,
    PRICING_FREE_FEATURE_1,
    PRICING_FREE_FEATURE_2,
    PRICING_FREE_FEATURE_3,
    PRICING_FREE_BUTTON,
    PRICING_PREMIUM_NAME,
    PRICING_PREMIUM_PRICE,
    PRICING_PREMIUM_FEATURE_1,
    PRICING_PREMIUM_FEATURE_2,
    PRICING_PREMIUM_FEATURE_3,
    PRICING_PREMIUM_BUTTON,
} from '../strings';

export interface PricingPlan {
    name: string;
    price: string;
    features: string[];
    buttonLabel: string;
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: PRICING_FREE_NAME,
        price: PRICING_FREE_PRICE,
        features: [PRICING_FREE_FEATURE_1, PRICING_FREE_FEATURE_2, PRICING_FREE_FEATURE_3],
        buttonLabel: PRICING_FREE_BUTTON,
    },
    {
        name: PRICING_PREMIUM_NAME,
        price: PRICING_PREMIUM_PRICE,
        features: [PRICING_PREMIUM_FEATURE_1, PRICING_PREMIUM_FEATURE_2, PRICING_PREMIUM_FEATURE_3],
        buttonLabel: PRICING_PREMIUM_BUTTON,
    },
];
