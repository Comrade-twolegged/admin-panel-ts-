import { useEffect } from "react";
import style from "./ModalWindowEditUser.module.scss";
import { User } from "../../@types/User"
import { useForm, SubmitHandler } from "react-hook-form";
import { editUser } from "../../slice/userSlice";
import Button from "../Button/Button";
import { useAppDispatch } from "../../hook";
import { useTranslation } from "react-i18next";

interface ModalWindowEditUserProps {
    closeModalWindow: () => void;
    user: User;
}

interface IFormInput {
    firstName: string
    email: string
    password: string
    id: string
}

export default function ModalWindowEditUser({ closeModalWindow, user }: ModalWindowEditUserProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        edit(data);
        closeModalWindow();
    } 
    const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    const {
        register,
        handleSubmit,
    } = useForm<IFormInput>({
        defaultValues: {
            firstName: user.firstName,
            email: user.email,
            password: user.password,
            id: user.id
        }
    });

    function edit(data: IFormInput) {
        dispatch(editUser(data))
    }

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    return (
        <div onClick={closeModalWindow} className={style.modalOverlay}>
            <div onClick={handleModalContentClick} className={style.modalContent}>
                <button onClick={closeModalWindow} className={style.back}>X</button>

                <h2 className="title-2">{t('editing')}</h2>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={style.formBlock}>
                        <label>{t('name')}</label>
                        <input
                            {...register("firstName")}
                            type="text" />
                    </div>

                    <div className={style.formBlock}>
                        <label>{t('email')}</label>
                        <input
                            {...register("email")}
                            type="text" />
                    </div>

                    <div className={style.formBlock}>
                        <label>{t('password')}</label> 
                        <input
                            {...register("password")}
                            type="text" />
                    </div>

                    <Button type="submit">{t('change')}</Button>
                </form>
            </div>
        </div>
    )
}