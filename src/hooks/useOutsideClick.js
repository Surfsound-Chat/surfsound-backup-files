import { useState, useEffect } from "react";
export const useOutsideClick = (ref) => {
    const [resetMenu, setResetMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setResetMenu(true);
            } else {
                setResetMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.addEventListener('click', handleClickOutside, true);
        }
    },[ref])
    return {resetMenu};
}