import React, {FC, useEffect} from "react";
import css from './Categories.module.css';
import {Category} from "../category/Category";

let Categories: FC = () => {

    return (
        <div className={css.wrap}>
            <div className={css.title}>Categories</div>
            <div className={css.categories_wrap}>
                <Category navigateTo={'Earrings'} title={'Earrings'} url={'https://ae01.alicdn.com/kf/H3a33c0f4fb234dea9122ba9ce52cdc9e4.jpg'}/>
                <Category navigateTo={'Rings'} title={'Rings'} url={'https://sc04.alicdn.com/kf/HTB1hg_YX.z1gK0jSZLeq6z9kVXae.jpg'}/>
                <Category navigateTo={'Bracelets'} title={'Bracelets'} url={'https://sc04.alicdn.com/kf/HTB1Ej4IaIrrK1Rjy1zeq6xalFXaO.jpg'}/>
                <Category navigateTo={'Necklaces'} title={'Necklaces'} url={'https://image.geeko.ltd/original/997c36a7-cbcc-4c8e-b879-660fe7672de3-72782-pc-sec'}/>
                <Category navigateTo={'Coulombs'} title={'Coulombs'} url={'https://sc04.alicdn.com/kf/Hed3d9b10bb55459aa89ff5ea41023a1bA.jpg'}/>
                <Category navigateTo={'Chains'} title={'Chains'} url={'https://sc04.alicdn.com/kf/H6c86201bba1c45b1bf8fbbcdf814bb1fK.jpg'}/>
            </div>
        </div>
    );
}

export {Categories};
