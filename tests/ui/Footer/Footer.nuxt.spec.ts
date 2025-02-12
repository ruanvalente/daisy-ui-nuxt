import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "~/components/ui/Footer/Footer.vue";

describe("<Footer />", () => {
  it("renders the footer correctly", () => {
    const wrapper = mount(Footer);

    expect(wrapper.find("footer").exists()).toBe(true);

    const copyrightText = wrapper.find("footer p").text();
    expect(copyrightText).toContain("Copyright ");
    expect(copyrightText).toContain("Ruan Valente");

    const currentYear = new Date().getFullYear();
    expect(copyrightText).toContain(currentYear.toString());
  });

  it("contains a link to GitHub profile", () => {
    const wrapper = mount(Footer);

    const githubLink = wrapper.find('a[href="https://github.com/ruanvalente"]');
    expect(githubLink.exists()).toBe(true);
    expect(githubLink.attributes("target")).toBe("_blank");
    expect(githubLink.attributes("rel")).toBe("noopener noreferrer");
  });

  it("has correct CSS classes", () => {
    const wrapper = mount(Footer);

    const footer = wrapper.find("footer");
    expect(footer.classes()).toContain("footer-center");
    expect(footer.classes()).toContain("p-4");
    expect(footer.classes()).toContain("bg-white");
    expect(footer.classes()).toContain("text-base-content");
    expect(footer.classes()).toContain("dark:text-gray-950");
  });
});
