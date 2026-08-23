import { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = title
          ? `${title} | Cinemate`
          : "Cinemate — Discover Movies";
    }, [title]);

  return null;
}
