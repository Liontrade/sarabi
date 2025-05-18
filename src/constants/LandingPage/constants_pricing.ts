export interface PricingPlanKeys {
    nameKey: string;
    priceKey: string;
    featureKeys: string[];
    buttonKey: string;
}

export const PRICING_PLANS: PricingPlanKeys[] = [
    {
        nameKey: 'free_plan_name',
        priceKey: 'free_plan_price',
        featureKeys: ['free_plan_feature_1', 'free_plan_feature_2', 'free_plan_feature_3'],
        buttonKey: 'free_plan_button',
    },
    {
        nameKey: 'premium_plan_name',
        priceKey: 'premium_plan_price',
        featureKeys: ['premium_plan_feature_1', 'premium_plan_feature_2', 'premium_plan_feature_3'],
        buttonKey: 'premium_plan_button',
    },
];
