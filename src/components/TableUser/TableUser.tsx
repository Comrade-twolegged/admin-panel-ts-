import style from "./TableUser.module.scss";
import Button, { CardColor } from "../Button/Button";
import { User } from "../../@types/User";
import { RootState } from "../../app/store/store";
import { useAppSelector } from "../../hook";
import { useTranslation } from "react-i18next";

interface TableUserProps {
    onEdit: (user: User) => void
    isOpenModal: (user: User) => void
}

export default function TableUser({ onEdit, isOpenModal }: TableUserProps) {
    const users = useAppSelector((state: RootState) => state.user.users)
    const { t } = useTranslation();
    return (
        <>
            {users.map((user: User) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td className={style.tdBtt}>
                        <div className={style.buttons}>
                            <Button onClick={() => onEdit(user)}>{t('change')}</Button>
                            <Button onClick={() => isOpenModal(user)} color={CardColor.red}>{t('remove')}</Button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}