import { type VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import Drawer from "~/components/ui/Drawer/Drawer.vue";

let wrapper: VueWrapper;

// Mock do vue-router
vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    currentRoute: {
      value: {
        path: "/",
      },
    },
  })),
}));

// Mock do useDrawer
vi.mock("~/composable/useDrawer/useDrawer", () => ({
  useDrawer: vi.fn(() => true),
}));

// Stub do NuxtLink
const NuxtLinkStub = defineComponent({
  name: "NuxtLink",
  props: ["to"],
  template: `<a><slot /></a>`,
});

beforeEach(() => {
  wrapper = mount(Drawer, {
    global: {
      components: {
        NuxtLink: NuxtLinkStub,
      },
    },
  });
});

describe("<Drawer />", () => {
  it("should render the drawer and toggle visibility based on drawerOpen state", async () => {
    expect(wrapper.exists()).toBe(true);

    const drawerElement = wrapper.find(".drawer-side");
    expect(drawerElement.classes()).toContain("drawer-side");
  });

  it("should highlight the active route in the menu", async () => {
    const activeLink = wrapper
      .findAll("li.py-2")
      .find((item) => item.text().includes("Home"));

    expect(activeLink).toBeDefined();
    if (activeLink) {
      expect(activeLink.exists()).toBe(true);
      expect(activeLink.find("a").classes()).toContain("bg-base-300");
      expect(activeLink.text()).toContain("Home");
    }
  });
});
