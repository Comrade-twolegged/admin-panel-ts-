import { useEffect } from "react";
import { useAppSelector } from "../../hook";

interface ThemeProviderReduxProps {
    children: React.ReactNode
}

export const ThemeProviderRedux: React.FC<ThemeProviderReduxProps> = ({ children }) => {
    const theme = useAppSelector((state) => state.theme.theme);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme])

    return <>{children}</>
}