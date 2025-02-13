import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Typography, { type TypographyTagType } from "~/components/ui/Typography/Typography.vue";

type TypographyTypeProps = {
	as: TypographyTagType;
	class: string;
	slots?: {
		default: string;
	};
};

const mountTypography = (props: TypographyTypeProps) =>
	mount(Typography, {
		props: {
			...props,
		},
	});

const defaultProps = {
	as: "p" as TypographyTagType,
	class: "text-base",
};

describe("<Typography />", () => {
	it("renders properly", () => {
		const wrapper = mountTypography({
			...defaultProps,
		});
		expect(wrapper.exists()).toBe(true);
	});

	it("renders the correct tag", () => {
		const wrapper = mountTypography({
			...defaultProps,
			as: "h1",
		});
		expect(wrapper.element.tagName).toBe("H1");
	});

	it("applies the correct class", () => {
		const wrapper = mountTypography({
			...defaultProps,
		});
		expect(wrapper.classes()).toContain("text-base");
	});

	it("renders slot content", () => {
		const wrapper = mountTypography({
			...defaultProps,
			slots: {
				default: "Hello World",
			},
		});

		expect(wrapper).toBeDefined();
	});
});
