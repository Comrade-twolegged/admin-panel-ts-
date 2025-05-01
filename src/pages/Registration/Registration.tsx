import { useForm, SubmitHandler } from "react-hook-form"
import Button, { CardColor } from "../../components/Button/Button"
import style from "./registration.module.scss"
import { loginUser } from "../../slice/userSlice"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../app/store/store"
import { useEffect } from "react"
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from "../../hook"
import { useTranslation } from "react-i18next"

interface IFormInput {
    firstName: string
    email: string
    password: string
}

export default function Registration() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state: RootState) => state.user.currentUser)
    const { register, handleSubmit, setError, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => login(data)
    const [cookies, setCookie] = useCookies(['currentUser']);

    function login(data: IFormInput) {
        dispatch(loginUser(data))
        setCookie('currentUser', JSON.stringify(data), {
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        navigate("/users");
    }

    useEffect(() => {
        if (currentUser.error) {
            setError("password", {
                type: "manual",
                message: currentUser.error
            });
            setError("email", {
                type: "manual",
                message: ""
            });
        }
    }, [currentUser.error, setError]);

    useEffect(() => {
        const currentUser = cookies.currentUser || null;

        if(currentUser){
            login(currentUser)
        }
    }, [])

    return (
        <div className="container">
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.formBlock}>
                    <label>{t('name')}</label>
                    <input
                        {...register("firstName", { required: "Ім'я обов'язкове", maxLength: 20 })}
                        aria-invalid={errors.firstName ? "true" : "false"}
                    />
                    {errors.firstName && <p className={style.error}>{errors.firstName.message}</p>}
                </div>

                <div className={style.formBlock}>
                    <label>{t('email')}</label>
                    <input
                        {...register("email", { required: "Пошта обов'язкова" })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p className={style.error}>{errors.email.message}</p>}
                </div>

                <div className={style.formBlock}>
                    <label>{t('password')}</label>
                    <input
                        {...register("password", { required: "Пароль обов'язковий" })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password && <p className={style.error}>{errors.password.message}</p>}
                </div>

                <Button type="submit" color={CardColor.blue}>{t('submit')}</Button>
            </form>
        </div>
    )
}

