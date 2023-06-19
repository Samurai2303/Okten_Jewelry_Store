export interface IProductsFiltersData {
    category: {
        Bracelets: boolean;
        Chains: boolean;
        Coulombs: boolean;
        Earrings: boolean;
        Neckless: boolean;
        Rings: boolean
    };
    in_stock: boolean;
    length: {
        max: string;
        min: string;
    };
    material: {
        '14K Gold': boolean;
        '18K Gold': boolean;
        '20K Gold': boolean;
        'White Gold': boolean;
        'Stainless Steel': boolean;
    };
    price: {
        max: string;
        min: string;
    };
    producer: {
        Xuping: boolean;
        Fallon: boolean;
    };
    discounts: {
        max: string
        min: string
    };
}
