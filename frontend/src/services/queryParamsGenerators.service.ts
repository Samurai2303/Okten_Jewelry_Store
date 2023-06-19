import {IProductsFiltersData} from "../interfaces";

let productsFiltersQueryParams = (data: IProductsFiltersData):string => {
    let resStr = '';

    let category_in: string[]|string = [];
    for (let key in data.category) {
        // @ts-ignore
        if (data.category[`${key}`]) {
            category_in.push(key);
        }
    }
    category_in = category_in.join(',');

    let material_in:string[]|string = [];
    for (let key in data.material) {
        // @ts-ignore
        if (data.material[`${key}`]) {
            material_in.push(key);
        }
    }
    material_in = material_in.join(',');

    let producer_in:string[]|string = [];
    for (let key in data.producer) {
        // @ts-ignore
        if (data.producer[`${key}`]) {
            producer_in.push(key);
        }
    }
    producer_in = producer_in.join(',');

    let amount_gte = -1000000;
    if (data.in_stock) {
        amount_gte = 1;
    }

    let length_range = `${data.length.min},${data.length.max}`;

    let price_range = `${data.price.min},${data.price.max}`;

    let discounts_range = `${data.discounts.min},${data.discounts.max}`;

    resStr = `category_in=${category_in}&material_in=${material_in}&length_range=${length_range}&price_range=${price_range}&producer_in=${producer_in}&amount_gte=${amount_gte}&discounts_range=${discounts_range}`;

    return resStr;
}

export {productsFiltersQueryParams};