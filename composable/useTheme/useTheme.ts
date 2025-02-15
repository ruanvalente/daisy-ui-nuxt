import { useLocalStorage } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";

export function useTheme() {
  const theme = useLocalStorage("theme", "light");

  const isDarkMode = ref(theme.value === "dark");

  const applyTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark", isDarkMode.value);
      document.body.setAttribute("data-theme", theme.value);
    }
  };

  const updateTheme = (newDarkMode: boolean) => {
    isDarkMode.value = newDarkMode;
    theme.value = newDarkMode ? "dark" : "light";
    applyTheme();
  };

  watch(theme, (newTheme) => {
    isDarkMode.value = newTheme === "dark";
    applyTheme();
  });

  onMounted(() => {
    applyTheme();
  });

  return {
    theme,
    isDarkMode,
    updateTheme,
  };
}
