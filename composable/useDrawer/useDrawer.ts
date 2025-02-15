import { onBeforeUnmount, onMounted } from "vue";
import { useState } from "#app";
export const useDrawer = () => {
  const drawerOpen = useState("drawerOpen", () => false);
  const updateDrawerState = () => {
    const isMediumOrLarger = window.innerWidth >= 768;
    drawerOpen.value = isMediumOrLarger;
  };

  onMounted(() => {
    updateDrawerState();
    window.addEventListener("resize", updateDrawerState);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateDrawerState);
  });

  return drawerOpen;
};
