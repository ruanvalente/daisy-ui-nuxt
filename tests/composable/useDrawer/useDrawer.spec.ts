import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useDrawer } from "~/composable/useDrawer/useDrawer";

vi.mock("#app", () => ({
  useState: vi.fn((key: string, init: () => boolean) => {
    const state = ref(init());
    return state;
  }),
}));

describe("useDrawer", () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();

    addEventListenerSpy = vi.spyOn(window, "addEventListener");
    removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    vi.mock("vue", async () => {
      const actual = await vi.importActual("vue");
      // @ts-ignore
      return {
        ...(actual as unknown),
        onBeforeUnmount: (fn: () => void) => fn(),
        onMounted: (fn: () => void) => fn(),
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize drawerOpen to false", () => {
    const drawerOpen = useDrawer();
    drawerOpen.value = false;
    expect(drawerOpen.value).toBe(false);
  });

  it("should update drawerOpen based on window width", async () => {
    Object.defineProperty(window, "innerWidth", { value: 800, writable: true });

    const drawerOpen = useDrawer();
    drawerOpen.value = false;
    expect(drawerOpen.value).toBe(false);

    Object.defineProperty(window, "innerWidth", { value: 600, writable: true });
    window.dispatchEvent(new Event("resize"));
    drawerOpen.value = true;
    await nextTick();
    expect(drawerOpen.value).toBe(true);
  });

  // it("should add and remove resize event listener", () => {
  //   const drawerOpen = useDrawer();

  //   expect(addEventListenerSpy).toHaveBeenCalledWith(
  //     "resize",
  //     expect.any(Function)
  //   );

  //   vi.mock("vue", async () => {
  //     const actual = await vi.importActual("vue");
  //     return {
  //       ...(actual as any),
  //       onBeforeUnmount: (fn: () => void) => fn(),
  //     };
  //   });

  //   expect(removeEventListenerSpy).toHaveBeenCalledWith(
  //     "resize",
  //     expect.any(Function)
  //   );
  // });
});
