import { vi } from "vitest";
import { config } from "@vue/test-utils";

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
