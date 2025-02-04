import { ref } from "vue";
import { useCookie } from "#app";
import { useRouter } from "vue-router";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useLogin } from "../../../composable/useLogin/useLogin";

vi.mock("#app", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useCookie: vi.fn(() => ({
    value: null,
  })),
}));

vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("useLogin", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    (useRouter as any).mockReturnValue({
      push: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    (useCookie as any).mockReturnValue({
      value: ref(null) as Ref<string | null>,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should initialize with loading as false", () => {
    const { loading } = useLogin();
    expect(loading.value).toBe(false);
  });

  it("should handle sign out correctly", () => {
    const { handleSignOut } = useLogin();
    const router = useRouter();
    const authToken = useCookie("authToken");

    authToken.value = "some-token";

    handleSignOut();
    vi.advanceTimersByTime(1000);

    expect(authToken.value).toBeNull();
    expect(router.push).toHaveBeenCalledWith("/login");
  });

  it("should handle sign in correctly", () => {
    const { handleSignIn, loading } = useLogin();
    const router = useRouter();
    const authToken = useCookie("authToken");

    handleSignIn();
    vi.advanceTimersByTime(3000);

    expect(authToken.value).not.toBeNull();
    expect(router.push).toHaveBeenCalledWith("/");
  });
});
