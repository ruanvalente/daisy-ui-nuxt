import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import About from "~/components/ui/About/About.vue";

const about = {
  name: "John Doe",
  role: "Developer",
  avatar: "/path/to/avatar.jpg",
  description:
    "Passionate developer with a love for creating innovative solutions.",
  hardSkills: ["TypeScript", "Vue.js", "Nuxt.js", "TailwindCSS"],
  softSkills: ["Team Collaboration", "Problem Solving", "Communication"],
  highlights: ["Built scalable web applications", "Mentored junior developers"],
  projectDescription: [
    "This project demonstrates a modern web application using Vue.js and Nuxt.js.",
    "It showcases best practices in frontend development and responsive design.",
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/johndoe",
      icon: "pi pi-github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      icon: "pi pi-linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/johndoe",
      icon: "pi pi-twitter",
    },
  ],
};
describe("<About />", () => {
  it("renders the about section correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    expect(wrapper.find("h3").text()).toBe(about.name);
    expect(wrapper.find(".badge").text()).toBe(about.role);

    const avatarImg = wrapper.find("img");
    expect(avatarImg.attributes("src")).toBe(about.avatar);
    expect(avatarImg.attributes("alt")).toBe(about.name);

    expect(wrapper.find("p").text()).toContain(about.description);
  });

  it("renders hard skills correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    const hardSkillsSection = wrapper.find('[data-testid="hard-skills"]');
    expect(hardSkillsSection.exists()).toBe(true);

    const hardSkills = hardSkillsSection.findAll('[aria-label^="Skill:"]');
    expect(hardSkills.length).toBe(about.hardSkills.length);

    hardSkills.forEach((skill, index) => {
      expect(skill.text()).toContain(about.hardSkills[index]);
    });
  });

  it("renders soft skills correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    const softSkillsSection = wrapper.find('[data-testid="soft-skills"]');
    expect(softSkillsSection.exists()).toBe(true);

    const softSkills = softSkillsSection.findAll(
      'div[data-testid^="soft-skill-"]',
    );
    expect(softSkills.length).toBe(about.softSkills.length);

    softSkills.forEach((skill, index) => {
      expect(skill.text()).toContain(about.softSkills[index]);
      expect(
        skill.find(`[data-testid="soft-skill-icon-${index}"]`).exists(),
      ).toBe(true);
    });
  });

  it("renders experience highlights correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    const highlightsSectionMobile = wrapper.find(
      '[data-testid="experience-highlights-mobile"]',
    );
    const highlightsSectionDesktop = wrapper.find(
      '[data-testid="experience-highlights-desktop"]',
    );

    expect(
      highlightsSectionMobile.exists() || highlightsSectionDesktop.exists(),
    ).toBe(true);

    const highlightsSection = highlightsSectionMobile.exists()
      ? highlightsSectionMobile
      : highlightsSectionDesktop;

    const highlights = highlightsSection.findAll(".text-gray-600");
    expect(highlights.length).toBe(about.highlights.length);

    highlights.forEach((highlight, index) => {
      expect(highlight.text()).toBe(about.highlights[index]);

      const previousSibling = highlight.element.previousElementSibling;
      expect(previousSibling?.classList.contains("pi-check-circle")).toBe(true);
    });
  });

  it("renders project description correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    const projectDescriptionSection = wrapper.find(
      '[data-testid="project-description"]',
    );
    expect(projectDescriptionSection.exists()).toBe(true);

    const paragraphs = projectDescriptionSection.findAll("p");
    expect(paragraphs.length).toBe(about.projectDescription.length);

    paragraphs.forEach((paragraph, index) => {
      expect(paragraph.text()).toBe(about.projectDescription[index]);
    });
  });

  it("renders social links correctly", () => {
    const wrapper = mount(About, {
      props: { about },
    });

    const connectSection = wrapper.find('[data-testid="connect"]');
    expect(connectSection.exists()).toBe(true);

    const socialLinks = connectSection.findAll("a");
    expect(socialLinks.length).toBe(about.socialLinks.length);

    socialLinks.forEach((link, index) => {
      const socialLink = about.socialLinks[index];

      expect(link.attributes("href")).toBe(socialLink.url);

      expect(link.attributes("target")).toBe("_blank");
      expect(link.attributes("rel")).toBe("noopener noreferrer");

      const srOnlyText = link.find(".sr-only");
      expect(srOnlyText.exists()).toBe(true);
      expect(srOnlyText.text()).toBe(socialLink.name);

      const iconSpan = link.findComponent({
        name: "span",
        props: { class: socialLink.icon },
      });
      expect(iconSpan.exists()).toBe(false);
    });
  });
});
