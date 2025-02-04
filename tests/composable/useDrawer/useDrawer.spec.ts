import { ref } from "vue";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDrawer } from "~/composable/useDrawer/useDrawer";

const useStateMock = vi.fn((key: string, init: () => boolean) => {
  const state = ref(init());
  return state;
});

describe("useDrawer", () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.stubGlobal(
      "onMounted",
      vi.fn((fn) => fn())
    );
    vi.stubGlobal(
      "onBeforeUnmount",
      vi.fn((fn) => fn())
    );

    vi.stubGlobal("useState", useStateMock);

    addEventListenerSpy = vi.spyOn(window, "addEventListener");
    removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize drawerOpen to false", () => {
    const drawerOpen = useDrawer();
    drawerOpen.value = false;
    expect(drawerOpen.value).toBe(false);
  });

  it("should update drawerOpen based on window width", () => {
    window.innerWidth = 800;
    const drawerOpen = useDrawer();
    expect(drawerOpen.value).toBe(true);

    window.innerWidth = 600;
    drawerOpen.value = false;
    window.dispatchEvent(new Event("resize"));
    expect(drawerOpen.value).toBe(false);
  });

  it("should add and remove resize event listener", () => {
    useDrawer();
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
