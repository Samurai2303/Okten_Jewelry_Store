import {FC} from "react";
import css from './OrderCard.module.css';
import {IOrder} from "../../interfaces";

interface IProps{
    order:IOrder,
    forAdmin:boolean
}

let OrderCard:FC<IProps> = ({order, forAdmin}) => {

    return (
        <div>

        </div>
    );
}

export {OrderCard};
