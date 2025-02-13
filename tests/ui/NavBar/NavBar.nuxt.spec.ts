import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import NavBar from "~/components/ui/NavBar/NavBar.vue";
import { ref } from "vue";

vi.mock("@clerk/nuxt/composables", () => ({
  useAuth: () => ({ signOut: vi.fn() }),
  useUser: () => ({ user: {} }),
}));

vi.mock("#app", () => ({
  useState: vi.fn(() => ref(false)),
}));

describe("<NavBar />", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(NavBar);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("emits the toggle event when clicking outside the NavBar", async () => {
    wrapper.vm.drawerOpen = true;

    document.body.click();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("toggle")).toBeFalsy();

    expect(wrapper.vm.drawerOpen).toBe(false);
  });
});
