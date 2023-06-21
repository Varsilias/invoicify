import { useRef, useEffect } from "react";

const useClickOutside = ({
  onClickOutside,
}: {
  onClickOutside: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return { ref };
};

export default useClickOutside;
