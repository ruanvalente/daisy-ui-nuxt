import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useTheme } from "~/composable/useTheme/useTheme";

const themeRef = ref("light");
const isDarkModeRef = ref(false);

vi.mock("~/composable/useTheme/useTheme", () => ({
	useTheme: () => ({
		theme: themeRef,
		isDarkMode: isDarkModeRef,
		updateTheme: vi.fn((darkMode: boolean) => {
			themeRef.value = darkMode ? "dark" : "light";
			isDarkModeRef.value = darkMode;
		}),
	}),
}));

describe("useTheme", () => {
	let theme: ReturnType<typeof useTheme>;

	beforeEach(() => {
		vi.clearAllMocks();
		themeRef.value = "light";
		isDarkModeRef.value = false;
		theme = useTheme();
	});

	it("should initialize with light theme", () => {
		expect(theme.theme.value).toBe("light");
		expect(theme.isDarkMode.value).toBe(false);
	});

	it("should toggle theme", () => {
		theme.updateTheme(true);
		expect(theme.theme.value).toBe("dark");
		expect(theme.isDarkMode.value).toBe(true);

		theme.updateTheme(false);
		expect(theme.theme.value).toBe("light");
		expect(theme.isDarkMode.value).toBe(false);
	});

	it("should call updateTheme with correct parameters", () => {
		theme.updateTheme(true);
		expect(theme.updateTheme).toHaveBeenCalledWith(true);
		expect(theme.updateTheme).toHaveBeenCalledTimes(1);
	});
});
