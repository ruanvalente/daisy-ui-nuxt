// import { watch, onMounted } from "vue";
// import { useLocalStorage } from "@vueuse/core";

// type DarkModeOnly = {
//   darkMode: boolean;
// };

// export function useTheme({ darkMode }: DarkModeOnly) {
//   const theme = useLocalStorage("theme", "light");

//   const isDarkMode = theme.value === "dark";

//   const updateTheme = (newDarkMode: boolean) => {
//     theme.value = newDarkMode ? "dark" : "light";

//     if (typeof window !== "undefined") {
//       document.body.classList.toggle("dark", newDarkMode);
//       document.body.setAttribute("data-theme", theme.value);
//     }
//   };

//   watch(
//     () => darkMode,
//     (newVal) => {
//       updateTheme(newVal);
//     }
//   );

//   onMounted(() => {
//     console.log("Tema salvo antes:", theme.value);
//     updateTheme(isDarkMode);
//     console.log("Tema salvo depois:", theme.value);
//   });

//   return {
//     theme,
//     updateTheme,
//     isDarkMode,
//   };
// }

import { ref, watch, onMounted } from "vue";
import { useLocalStorage } from "@vueuse/core";

export function useTheme() {
  // Recupera o tema do localStorage ou define um padrão "light"
  const theme = useLocalStorage("theme", "light");

  // Computa se está no modo escuro
  const isDarkMode = ref(theme.value === "dark");

  // Aplica o tema no `document.body`
  const applyTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark", isDarkMode.value);
      document.body.setAttribute("data-theme", theme.value);
    }
  };

  // Atualiza o tema e o localStorage
  const updateTheme = (newDarkMode: boolean) => {
    isDarkMode.value = newDarkMode;
    theme.value = newDarkMode ? "dark" : "light";
    applyTheme();
  };

  // Monitora mudanças no localStorage e aplica o tema
  watch(theme, (newTheme) => {
    console.log("theme", newTheme);
    isDarkMode.value = newTheme === "dark";
    applyTheme();
  });

  // Aplica o tema salvo quando o componente for montado
  onMounted(() => {
    applyTheme();
  });

  return {
    theme,
    isDarkMode,
    updateTheme,
  };
}
