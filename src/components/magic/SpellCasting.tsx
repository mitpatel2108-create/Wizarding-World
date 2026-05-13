import { useEffect } from "react";

export default function SpellCasting() {
  useEffect(() => {
    const handleSpell = (e: KeyboardEvent) => {
      // Lumos
      if (e.key === "l") {
        document.body.style.filter = "brightness(1.2)";
      }

      // Nox
      if (e.key === "n") {
        document.body.style.filter = "brightness(1)";
      }

      // Expelliarmus effect
      if (e.key === "x") {
        document.body.animate(
          [
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(0px)" },
          ],
          {
            duration: 400,
          }
        );
      }
    };

    window.addEventListener("keydown", handleSpell);

    return () => {
      window.removeEventListener("keydown", handleSpell);
    };
  }, []);

  return null;
}