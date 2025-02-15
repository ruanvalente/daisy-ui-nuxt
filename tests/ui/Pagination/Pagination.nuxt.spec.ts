import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Pagination from "~/components/ui/Pagination/Pagination.vue";

describe("Pagination", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
      },
    });
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
    expect(wrapper.find('button[aria-label="Next"]').exists()).toBe(true);
  });

  it("emits update:currentPage event when a page is clicked", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        maxVisiblePages: 5,
      },
    });

    const pageButtons = wrapper.findAll("button").filter((button) => {
      const text = button.text();
      return !Number.isNaN(Number(text));
    });

    expect(pageButtons.length).toBeGreaterThan(0);

    await pageButtons[1].trigger("click");

    expect(wrapper.emitted("update:currentPage")).toBeTruthy();
    expect(wrapper.emitted("update:currentPage")?.[0]).toEqual([2]);
  });

  it("disables Previous button on first page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
      },
    });

    const previousButton = wrapper.find('button[aria-label="Previous"]');
    expect(previousButton.attributes("disabled")).toBeDefined();
  });

  it("disables Next button on last page", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 10,
        totalPages: 10,
      },
    });

    const nextButton = wrapper.find('button[aria-label="Next"]');
    expect(nextButton.attributes("disabled")).toBeDefined();
  });

  it("displays correct range of pages based on maxVisiblePages", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 10,
        maxVisiblePages: 5,
      },
    });

    const pageButtons = wrapper.findAll("button").filter((button) => {
      const text = button.text();
      return !Number.isNaN(Number(text));
    });

    expect(pageButtons.length).toBe(5);
    expect(pageButtons[0].text()).toBe("3");
    expect(pageButtons[4].text()).toBe("7");
  });

  it("shows items per page select when showExtras is true", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        showExtras: true,
        itemsPerPage: 10,
        totalItems: 100,
      },
    });

    const select = wrapper.find("select");
    expect(select.exists()).toBe(true);

    await select.setValue("20");
    expect(wrapper.emitted("update:itemsPerPage")?.[0]).toEqual([20]);
  });

  it("displays correct items range when showExtras is true", async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 10,
        showExtras: true,
        itemsPerPage: 10,
        totalItems: 100,
      },
    });

    const rangeText = wrapper.find(".text-sm.text-gray-600");
    expect(rangeText.text()).toContain("Showing 11 to 20 of 100 items");
  });
});
