import { config } from "@vue/test-utils";
import { vi } from "vitest";

vi.mock("#app", async () => {
  const actual = await vi.importActual("#app");
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      currentRoute: { value: { path: "/" } },
    }),
  };
});

config.global.mocks = {
  $t: (msg: string) => msg,
};
