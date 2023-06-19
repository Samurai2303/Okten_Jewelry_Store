import {FC} from "react";
import css from './Category.module.css';
import {useNavigate} from "react-router-dom";

interface IProps {
    title: string;
    url: string;
    navigateTo: string;
}

let Category: FC<IProps> = ({title, url, navigateTo}) => {

    let navigate = useNavigate();

    return (
        <div className={css.wrap} onClick={() => navigate(`/userLayout/home/search?category_in=${navigateTo}`)}>
            <div className={css.img_wrap}>
                <img className={css.img} src={url} alt={title}/>
            </div>
            <div className={css.title}>{title}</div>
        </div>
    );
};

export {Category};
