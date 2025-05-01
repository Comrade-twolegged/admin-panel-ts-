import style from "./ModalWindow.module.scss"
import Button, { CardColor } from "../Button/Button";
import { useTranslation } from "react-i18next";

interface ModalWindowProps {
    closeModalWindow: () => void
    toAgree: () => void
    content: string
}

export default function ModalWindow({ closeModalWindow, toAgree, content }: ModalWindowProps) {
    const { t } = useTranslation();
    const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    return (
        <div onClick={closeModalWindow} className={style.modalOverlay}>
            <div onClick={handleModalContentClick} className={style.modalContent}>

                <button onClick={closeModalWindow} className={style.back}>X</button>

                <div className={style.content}>
                    <p>{content}</p>
                </div>

                <div className={style.buttons}>
                    <Button onClick={() => { toAgree(); closeModalWindow() }}>{t('yes')}</Button>
                    <Button onClick={closeModalWindow} color={CardColor.red}>{t('no')}</Button>
                </div>
            </div>
        </div>
    )
}