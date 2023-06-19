import {FC, useEffect, useState} from "react";
import css from './LogInWindow.module.css';
import {useForm} from "react-hook-form";
import {ILogin} from "../../interfaces";
import {useAppDispatch, useAppLocations} from "../../hooks";
import {authService} from "../../services";
import {userActions} from "../../redux";
import {Location, useNavigate, useSearchParams} from "react-router-dom";

let LogInWindow: FC = () => {

    let {register, formState: {isValid, errors}, handleSubmit} = useForm<ILogin>({mode: "all"});
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let {state} = useAppLocations<Location>();
    let [params, _] = useSearchParams();

    let [loginErr, setLoginErr] = useState<boolean>(false);

    let submit = async (loginData: ILogin) => {
        try {
            let {data} = await authService.login(loginData);
            authService.setTokens(data);
            dispatch(userActions.getLoggedUser());
            setLoginErr(false);
            if (state) {
                navigate(state.pathname, {replace: true})
            } else {
                navigate('/');
            }
        } catch (e) {
            setLoginErr(true);
        }
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(userActions.setLoggedUser(JSON.parse(localStorage.getItem('loggedUser'))))
    }, []);

    return (
        <div className={css.wrap}>
            <div className={css.title}>Log In</div>
            {params.has('expSession') && <div className={css.session_exp}>Session Expired</div>}
            <form onSubmit={handleSubmit(submit)}>
                <div className={css.input_title}>Email</div>
                <input className={css.input} type="email"
                       placeholder={'Email'} {...register('email',
                    {
                        required: {value: true, message: 'Email is required'},
                        pattern: {
                            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                            message: 'Email is invalid'
                        }
                    })}/>
                <div className={css.input_title}>Password</div>
                <input className={css.input} type="password" placeholder={'Password'} {...register('password',
                    {
                        required: {value: true, message: 'Password is required'},
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])(?=.*[\d])[^\s]{5,20}$/,
                            message: 'Password is invalid'
                        }
                    })}/>

                {errors.email && <div className={css.error}>{errors.email.message}</div>}
                {errors.password && <div className={css.error}>{errors.password.message}</div>}
                {loginErr && <div className={css.error}>No active account found with the given credentials</div>}

                <div className={css.btn_wrap}>
                    <button className={css.btn} disabled={!isValid}>Log In</button>
                </div>
            </form>

        </div>
    );
}

export {LogInWindow};
