import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import Settings from "~/components/ui/Settings/Settings.vue";
import ToggleSwitch from "~/components/ui/ToggleSwitch/ToggleSwitch.vue";

const isDarkMode = ref(false);
const updateTheme = vi.fn((value) => {
	isDarkMode.value = value;
});

vi.mock("~/composable/useTheme/useTheme", () => ({
	useTheme: () => ({
		isDarkMode,
		updateTheme,
	}),
}));

describe("<Settings />", () => {
	const mockSettings = {
		darkMode: false,
		compactMode: false,
		emailNotifications: true,
		pushNotifications: false,
		profileVisibility: "public" as const,
		showActivityStatus: true,
		lastPasswordChange: "2024-01-01",
		twoFactorEnabled: false,
		storageUsed: "2.5 GB",
		storageTotal: "5 GB",
		storageUsedPercent: 50,
	};

	const mountComponent = () => {
		return mount(Settings, {
			props: {
				settings: mockSettings,
			},
			global: {
				components: {
					ToggleSwitch,
				},
				stubs: {
					ToggleSwitch: {
						template: `
              <button
                  :class="modelValue ? 'active' : ''"
                  @click="$emit('update:modelValue', !modelValue)"
              >
                {{ modelValue ? 'On' : 'Off' }}
              </button>
            `,
						props: {
							modelValue: {
								type: Boolean,
								required: true,
							},
						},
						emits: ["update:modelValue"],
					},
				},
			},
		});
	};

	describe("UI Content Checks", () => {
		it("renders all settings sections correctly", () => {
			const wrapper = mountComponent();

			expect(wrapper.text()).toContain("Appearance");
			expect(wrapper.text()).toContain("Notifications");
			expect(wrapper.text()).toContain("Privacy");
			expect(wrapper.text()).toContain("Account Security");
			expect(wrapper.text()).toContain("Data & Storage");
		});

		it("displays correct dark mode toggle state", () => {
			const wrapper = mountComponent();
			const darkModeToggle = wrapper.findAllComponents(ToggleSwitch)[0];

			expect(darkModeToggle.text()).toBe("Off"); // Esperado inicial
		});

		it("displays correct profile visibility options", () => {
			const wrapper = mountComponent();
			const select = wrapper.find("select");

			expect(select.exists()).toBe(true);
			expect(select.findAll("option").map((option) => option.text())).toEqual([
				"Public",
				"Private",
				"Contacts Only",
			]);
		});

		it("displays correct storage usage", () => {
			const wrapper = mountComponent();
			expect(wrapper.text()).toContain("2.5 GB of 5 GB");
		});
	});

	describe("Appearance Settings", () => {
		it("emits update event when dark mode is toggled", async () => {
			const wrapper = mountComponent();

			const darkModeToggle = wrapper.findAllComponents(ToggleSwitch)[0];
			await darkModeToggle.trigger("click");
			const updateEvents = wrapper.emitted("update");

			expect(updateEvents).toBeTruthy();
			expect(updateEvents?.at(-1)).toEqual(["darkMode", true]);
		});
	});

	describe("Theme Integration", () => {
		it("updates theme when dark mode is toggled", async () => {
			const wrapper = mountComponent();

			const darkModeToggle = wrapper.findAllComponents(ToggleSwitch)[0];
			await darkModeToggle.trigger("click");

			expect(updateTheme).toHaveBeenCalledWith(true);
			expect(isDarkMode.value).toBe(true);
		});
	});
});
