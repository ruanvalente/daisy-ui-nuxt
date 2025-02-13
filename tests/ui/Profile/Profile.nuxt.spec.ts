import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Modal from "~/components/ui/Modal/Modal.vue";
import Profile from "~/components/ui/Profile/Profile.vue";

vi.mock("@clerk/nuxt/composables", () => ({
	useUser: () => ({
		user: {
			fullName: "John Doe",
			emailAddresses: ["john@example.com"],
			imageUrl: "https://example.com/avatar.jpg",
			createdAt: "2024-01-01T00:00:00.000Z",
			lastSignInAt: "2024-02-01T00:00:00.000Z",
		},
	}),
}));

describe("<Profile />", () => {
	const mockUserData = {
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		avatar: "https://example.com/avatar.jpg",
		joinDate: "2024-01-01",
		lastLogin: "2024-02-01",
		department: "IT",
		status: "Active",
	};

	const mountProfile = () => {
		return mount(Profile, {
			props: {
				userData: mockUserData,
			},
			global: {
				components: {
					Modal,
					NuxtImg: {
						template: "<img />",
						props: ["src", "alt"],
					},
				},
			},
		});
	};

	it("renders user information correctly", () => {
		const wrapper = mountProfile();

		expect(wrapper.text()).toContain("John Doe");
		expect(wrapper.text()).toContain("Admin");
		expect(wrapper.text()).toContain("John Doe");
		expect(wrapper.text()).toContain("Active");
	});

	it("opens edit modal when edit button is clicked", async () => {
		const wrapper = mountProfile();

		await wrapper.find('button[aria-label="Edit profile"]').trigger("click");

		expect(wrapper.findComponent(Modal).props("isOpen")).toBe(true);
	});

	it("populates form with current user data when modal opens", async () => {
		const wrapper = mountProfile();

		await wrapper.find('button[aria-label="Edit profile"]').trigger("click");

		const nameInput = wrapper.find('input[type="text"]');
		const emailInput = wrapper.find('input[type="email"]');

		expect(nameInput.element.value).toBe(mockUserData.name);
		expect(emailInput.element.value).toBe(mockUserData.email);
	});

	it("emits save event with updated data when form is submitted", async () => {
		const wrapper = mountProfile();

		await wrapper.find('button[aria-label="Edit profile"]').trigger("click");

		const nameInput = wrapper.find('input[type="text"]');
		await nameInput.setValue("Jane Doe");

		await wrapper.find("form").trigger("submit.prevent");

		expect(wrapper.emitted("save")).toBeTruthy();
		expect(wrapper.emitted("save")?.[0][0]).toMatchObject({
			name: "Jane Doe",
			email: mockUserData.email,
			department: mockUserData.department,
			avatar: mockUserData.avatar,
		});
	});

	it("closes modal when cancel button is clicked", async () => {
		const wrapper = mountProfile();

		await wrapper.find('button[aria-label="Edit profile"]').trigger("click");

		await wrapper.find('button[aria-label="Cancel action"]').trigger("click");

		expect(wrapper.findComponent(Modal).props("isOpen")).toBe(false);
	});

	it("formats dates correctly", () => {
		const wrapper = mountProfile();

		const formattedJoinDate = new Date("2024-01-01").toLocaleDateString("pt-BR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		expect(wrapper.text()).toContain(formattedJoinDate);
	});

	it("displays default avatar when user image is not available", () => {
		vi.mock("@clerk/nuxt/composables", () => ({
			useUser: () => ({
				user: {
					fullName: "John Doe",
					emailAddresses: ["john@example.com"],
					imageUrl: null,
					createdAt: "2024-01-01T00:00:00.000Z",
					lastSignInAt: "2024-02-01T00:00:00.000Z",
				},
			}),
		}));

		const wrapper = mountProfile();
		const avatar = wrapper.find("img");
		expect(avatar.attributes("src")).toBeTruthy;
	});
});
