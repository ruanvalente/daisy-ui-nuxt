import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseSelect from "~/components/ui/BaseSelect/BaseSelect.vue";

type TypeProps = {
  modelValue?: string;
  placeholder?: string;
  options?: { value: string; text: string }[];
  label?: string;
  selectClass?: string;
  required?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
};

type BaseSelectType = {
  props: TypeProps;
};

const mountBaseSelect = (props: TypeProps = {}) =>
  mount(BaseSelect, {
    props: {
      modelValue: "",
      placeholder: "Select an option",
      options: [],
      ...props,
    },
  });

describe("<BaseSelect />", () => {
  const options = [
    { value: "", text: "Select an option" },
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
  ];

  it("renders the select with default props", () => {
    const wrapper = mountBaseSelect({
      options,
    });

    const select = wrapper.find("select");
    expect(select.exists()).toBe(true);
    expect(select.element.value).toBe("");
  });

  it("renders label when provided", () => {
    const label = "Choose an option";
    const wrapper = mountBaseSelect({
      label,
      options,
    });

    const labelElement = wrapper.find("label");
    expect(labelElement.exists()).toBe(true);

    const labelText = labelElement.find(".label-text");
    expect(labelText.text()).toBe(label);
  });

  it("renders options correctly", () => {
    const wrapper = mountBaseSelect({
      options,
    });

    const optionElements = wrapper.findAll("option");

    expect(optionElements.length).toBeGreaterThanOrEqual(options.length);

    const firstOption = optionElements[0];
    expect(firstOption.attributes("value")).toBe("");
    expect(firstOption.text()).toBe("Select an option");
  });

  it("emits update:modelValue on selection", async () => {
    const wrapper = mountBaseSelect({
      options,
    });

    const select = wrapper.find("select");
    await select.setValue(options[1].value);

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual([options[1].value]);
  });

  it("applies custom input class", () => {
    const customClass = "custom-select-class";
    const wrapper = mountBaseSelect({
      options,
      selectClass: customClass,
    });

    const select = wrapper.find("select");
    expect(select.classes()).toContain(customClass);
  });

  it("sets required attribute", () => {
    const wrapper = mountBaseSelect({
      options,
      required: true,
    });

    const select = wrapper.find("select");
    expect(select.attributes("required")).toBeDefined();
  });

  it("sets disabled attribute", () => {
    const wrapper = mountBaseSelect({
      options,
      disabled: true,
    });

    const select = wrapper.find("select");
    expect(select.attributes("disabled")).toBeDefined();
  });

  it("passes through additional attributes", () => {
    const attributes = {
      "data-testid": "custom-select",
      disabled: true,
    };

    const wrapper = mountBaseSelect({
      options,
      ...attributes,
    });

    const select = wrapper.find("select");
    expect(select.attributes("data-testid")).toBe("custom-select");
    expect(select.attributes("disabled")).toBeDefined();
  });
});
