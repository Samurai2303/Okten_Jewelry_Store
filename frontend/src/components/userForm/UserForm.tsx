import {ChangeEvent, FC, useEffect, useState} from "react";
import {IUser, IUserToCreate} from "../../interfaces";
import {useForm} from "react-hook-form";
import css from './UserForm.module.css';
import {usersService} from "../../services";

interface IProps {
    userData: IUser | null;
}

let UserForm: FC<IProps> = ({userData}) => {

    let {register, handleSubmit, formState: {isValid, errors}, setValue} = useForm<IUserToCreate>({mode: "all"});

    useEffect(() => {
        if (userData) {
            setValue('email', userData.email);
            setValue('profile.name', userData.profile.name);
            setValue('profile.surname', userData.profile.surname);
            // @ts-ignore
            setValue('profile.age', userData.profile.age);
            setValue('profile.phone', userData.profile.phone);
            if (userData.profile.photo) {
                setPhoto(`http://localhost/api${userData.profile.photo}`);
            }
        }
    }, []);

    let [photo, setPhoto] = useState<string>('https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg');

    let change = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files.length) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // @ts-ignore
                    setPhoto(e.target.result);
                }
                reader.readAsDataURL(event.target.files[0]);
            } else {
                setPhoto('https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg')
            }
        }
    }

    let [signUpErr, setSignUpErr] = useState<boolean>(false);
    let [signedUp, setSignedUp] = useState<boolean>(false);
    let [updated, setUpdated] = useState<boolean>(false);

    let submit = async (data: IUserToCreate) => {
        let formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profile.name', data.profile.name);
        formData.append('profile.surname', data.profile.surname);
        formData.append('profile.age', data.profile.age);
        formData.append('profile.phone', data.profile.phone);
        if (data.profile.photo.length) {
            formData.append('profile.photo', data.profile.photo[0])
        }
        try {
            if (userData) {
                await usersService.updateLogged(formData)
                setUpdated(true);
            } else {
                await usersService.createUser(formData);
                setSignedUp(true);
            }
            setSignUpErr(false);
        } catch (e) {
            setSignUpErr(true);
            setSignedUp(false);
            setUpdated(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={css.photo_wrap}>
                    <div className={css.img_wrap}>
                        <img src={photo} alt="user_photo" className={css.img}/>
                    </div>
                    <label className={css.label}>
                        <input className={css.file_input} type="file"
                               accept="image/*" {...register('profile.photo', {onChange: (e) => change(e)})}/>
                        Choose your photo <i className={`fa-solid fa-camera ${css.camera}`}></i>
                    </label>
                </div>
                <div className={css.input_title}>Email</div>
                <input disabled={!!userData} className={css.input} type="email"
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
                            message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special symbol and be between 5 and 20 characters long'
                        }
                    })}/>
                <div className={css.input_title}>Name</div>
                <input className={css.input} type="text" placeholder={'Name'} {...register('profile.name',
                    {
                        required: {value: true, message: 'Name is required'},
                        pattern: {
                            value: /^[a-zA-Z]{2,16}$/,
                            message: 'Name must contain only letters and be between 2 and 16 characters long'
                        }
                    })}/>
                <div className={css.input_title}>Surname</div>
                <input className={css.input} type="text" placeholder={'Surname'} {...register('profile.surname',
                    {
                        required: {value: true, message: 'Surname is required'},
                        pattern: {
                            value: /^[a-zA-Z]{2,24}$/,
                            message: 'Name must contain only letters and be between 2 and 24 characters long'
                        }
                    })}/>
                <div className={css.input_title}>Age</div>
                <input className={css.input} type="number" placeholder={'Age'} {...register('profile.age',
                    {
                        required: {value: true, message: 'Age is required'},
                        valueAsNumber: true,
                        min: {value: 1, message: 'Minimal age is 1'},
                        max: {value: 100, message: 'Maximal age is 100'}
                    })}/>
                <div className={css.input_title}>Phone</div>
                <input className={css.input} type="text" placeholder={'Phone'} {...register('profile.phone',
                    {
                        required: {value: true, message: 'Phone is required'},
                        pattern: {
                            value: /(?=.*\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4,5}$)/,
                            message: 'Phone is invalid. Allowed format: +380-12-345-6789 or +380-12-345-67890'
                        }
                    })}/>

                {/*// @ts-ignore*/}
                {errors.email && <div className={css.error}>{errors.email.message}</div>}
                {/*// @ts-ignore*/}
                {errors.password && <div className={css.error}>{errors.password.message}</div>}
                {/*// @ts-ignore*/}
                {errors.profile?.name && <div className={css.error}>{errors.profile.name.message}</div>}
                {/*// @ts-ignore*/}
                {errors.profile?.surname && <div className={css.error}>{errors.profile.surname.message}</div>}
                {/*// @ts-ignore*/}
                {errors.profile?.age && <div className={css.error}>{errors.profile.age.message}</div>}
                {/*// @ts-ignore*/}
                {errors.profile?.phone && <div className={css.error}>{errors.profile.phone.message}</div>}
                {signUpErr &&
                    <div className={css.error}>Something went wrong. Maybe user with this email already exists</div>}

                {signedUp &&
                    <div className={css.message}>We have sent a letter to your email. To activate the account, follow
                        the link in the letter</div>}

                {updated && <div className={css.message}>Updated successfully</div>}

                <div className={css.btn_wrap}>
                    <button className={css.btn} disabled={!isValid}>{userData ? 'Edit' : 'Sign Up'}</button>
                </div>

            </form>

        </div>
    );
}

export {UserForm};
