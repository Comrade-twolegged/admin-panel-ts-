import style from "./Users.module.scss";
import TableUser from "../../components/TableUser/TableUser";
import { useState } from "react";
import { User } from "../../@types/User"
import ModalWindowEditUser from "../../components/ModalWindowEditUser/ModalWindowEditUser";
import ModalWindow from "../../components/ModalWindow/ModalWondow";
import { deleteUser } from "../../slice/userSlice";
import { useAppDispatch } from "../../hook";
import { toggleTheme } from "../../slice/themeSlice";
import Button from "../../components/Button/Button";
import { useTranslation } from 'react-i18next';

export default function Users() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: 'en' | 'uk') => {
        i18n.changeLanguage(lng);
    };

    const dispatch = useAppDispatch();

    const [modal, setModal] = useState<null | { type: "edit" | "delete", user: User }>(null);

    function openEditModal(user: User) {
        setModal({ type: "edit", user });
    }

    function openDeleteModal(user: User) {
        setModal({ type: "delete", user });
    }

    function closeModal() {
        setModal(null);
    }

    return (
        <div className="container">
            <Button onClick={() => dispatch(toggleTheme())}>theme</Button>

            <Button onClick={() => changeLanguage('uk')}>Українська</Button>
            <Button onClick={() => changeLanguage('en')}>English</Button>

            <table className={style.table}>
                <thead>
                    <tr className={style.titleTable}>
                        <td>Id</td>
                        <td>{t('name')}</td>
                        <td>{t('email')}</td>
                        <td>{t('password')}</td>
                    </tr>
                </thead>
                <tbody>
                    <TableUser
                        onEdit={openEditModal}
                        isOpenModal={openDeleteModal}
                    />
                </tbody>
            </table>

            {modal?.type === "edit" && (
                <ModalWindowEditUser
                    closeModalWindow={closeModal}
                    user={modal.user}
                />
            )}

            {modal?.type === "delete" && (
                <ModalWindow
                    closeModalWindow={closeModal}
                    content={t('deleteUser')}
                    toAgree={() => {
                        dispatch(deleteUser(modal.user.id));
                        closeModal();
                    }}
                />
            )}
        </div>
    )
}