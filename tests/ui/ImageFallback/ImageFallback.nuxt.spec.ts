import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ImageFallback from "~/components/ui/ImageFallback/ImageFallback.vue";

describe("<ImageFallback />", () => {
  it("renders the component", () => {
    const wrapper = mount(ImageFallback);

    const span = wrapper.find("span");
    expect(span.exists()).toBe(true);
  });
});
