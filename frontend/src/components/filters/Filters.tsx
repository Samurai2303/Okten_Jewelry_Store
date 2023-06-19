import {FC} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {IProductsFiltersData} from "../../interfaces";
import {productsFiltersQueryParams} from "../../services";
import css from './Filters.module.css';

let Filters: FC = () => {

    let {handleSubmit, register} = useForm<IProductsFiltersData>();
    let navigate = useNavigate();

    async function submit(data: IProductsFiltersData) {
        let queryParamsStr = productsFiltersQueryParams(data);
        navigate(`/userLayout/home/search?${queryParamsStr}&page=1`);
    }

    function arrow_click(element_id: string): void {
        // @ts-ignore
        document.getElementById(element_id).classList.toggle(css[`${element_id}`]);
    }

    return (
        <div className={css.wrap}>
            <div className={css.title}>Filters</div>
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={css.block} id='category_block'>
                        <div className={css.title_box}>
                            <div className={css.block_title}>Category</div>
                            <div className={css.arrow} onClick={() => arrow_click('category_block')}></div>
                        </div>
                        <div>
                            <input className={css.checkbox} id='earrings'
                                   type="checkbox" {...register('category.Earrings', {})}/>
                            <label htmlFor="earrings">Earrings</label>
                            <br/>
                            <input className={css.checkbox} id='rings'
                                   type="checkbox" {...register('category.Rings', {})}/>
                            <label htmlFor='rings'>Rings</label>
                            <br/>
                            <input className={css.checkbox} id='bracelets'
                                   type="checkbox" {...register('category.Bracelets', {})}/>
                            <label htmlFor='bracelets'>Bracelets</label>
                            <br/>
                            <input className={css.checkbox} id='necklaces'
                                   type="checkbox" {...register('category.Neckless', {})}/>
                            <label htmlFor='necklaces'>Necklaces</label>
                            <br/>
                            <input className={css.checkbox} id='coulombs'
                                   type="checkbox" {...register('category.Coulombs', {})}/>
                            <label htmlFor='coulombs'>Coulombs</label>
                            <br/>
                            <input className={css.checkbox} id='chains'
                                   type="checkbox" {...register('category.Chains', {})}/>
                            <label htmlFor='chains'>Chains</label>
                        </div>
                    </div>
                    <div className={css.block} id='producer_block'>
                        <div className={css.title_box}>
                            <div className={css.block_title}>Producer</div>
                            <div className={css.arrow} onClick={() => arrow_click('producer_block')}></div>
                        </div>
                        <input className={css.checkbox} id='xuping'
                               type="checkbox" {...register('producer.Xuping', {})}/>
                        <label htmlFor='xuping'>Xuping</label>
                        <br/>
                        <input className={css.checkbox} id='fallon'
                               type="checkbox" {...register('producer.Fallon', {})}/>
                        <label htmlFor='fallon'>Fallon</label>
                    </div>
                    <div className={css.block} id='material_block'>
                        <div className={css.title_box}>
                            <div className={css.block_title}>Material</div>
                            <div className={css.arrow} onClick={() => arrow_click('material_block')}></div>
                        </div>
                        <input className={css.checkbox} id='14k_gold'
                               type="checkbox" {...register('material.14K Gold', {})}/>
                        <label htmlFor='14k_gold'>14K Gold</label>
                        <br/>
                        <input className={css.checkbox} id='18k_gold'
                               type="checkbox" {...register('material.18K Gold', {})}/>
                        <label htmlFor='18k_gold'>18K Gold</label>
                        <br/>
                        <input className={css.checkbox} id='20k_gold'
                               type="checkbox" {...register('material.20K Gold', {})}/>
                        <label htmlFor='20k_gold'>20K Gold</label>
                        <br/>
                        <input className={css.checkbox} id='white_gold'
                               type="checkbox" {...register('material.White Gold', {})}/>
                        <label htmlFor='white_gold'>White Gold</label>
                        <br/>
                        <input className={css.checkbox} id='stainless_steel'
                               type="checkbox" {...register('material.Stainless Steel', {})}/>
                        <label htmlFor='stainless_steel'>Stainless Steel</label>
                    </div>
                    <div className={css.range_block}>
                        <div className={css.range_block_title}>Length</div>
                        <div className={css.input_text}>From
                            <input className={css.number_input} type="number" min={0}
                                   defaultValue={0} {...register('length.min', {})}/>
                            to
                            <input className={css.number_input} type="number" min={0}
                                   defaultValue={150} {...register('length.max', {})}/>
                            cm
                        </div>
                    </div>
                    <div className={css.range_block}>
                        <div className={css.range_block_title}>Price</div>
                        <div className={css.input_text}>From
                            <input className={css.number_input} type="number" min={0}
                                   defaultValue={0} {...register('price.min', {})}/>
                            to
                            <input className={css.number_input} type="number" min={0}
                                   defaultValue={2000} {...register('price.max', {})}/>
                            UAH
                        </div>
                    </div>
                    <div className={css.range_block}>
                        <div className={css.range_block_title}>Discounts</div>
                        <div className={css.input_text}>From
                            <input className={css.number_input} type="number" min={0}
                                   defaultValue={0} {...register('discounts.min', {})}/>
                            to
                            <input className={css.number_input} type="number" min={0} max={100}
                                   defaultValue={100} {...register('discounts.max', {})}/>
                            %
                        </div>
                    </div>
                    <div className={css.in_stock_div}>
                        <input type="checkbox" className={css.checkbox} {...register('in_stock', {})}/>
                        In Stock
                    </div>
                    <div className={css.btn_wrap}>
                        <button className={css.search_btn}>Search</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export {Filters};
