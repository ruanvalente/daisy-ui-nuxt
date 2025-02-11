import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseInput from "~/components/ui/BaseInput/BaseInput.vue";

const mountBaseInput = (props = {}) =>
  mount(BaseInput, {
    props: {
      modelValue: "",
      type: "text",
      ...props,
    },
  });

describe("<BaseInput />", () => {
  it("renders the input with default props", () => {
    const wrapper = mountBaseInput({
      modelValue: "Test Value",
    });

    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);

    expect(input.element.value).toBe("Test Value");

    expect(input.attributes("type")).toBe("text");
  });

  it("renders label when provided", () => {
    const label = "Username";
    const wrapper = mountBaseInput({ label });

    const labelElement = wrapper.find("label");
    expect(labelElement.exists()).toBe(true);

    const labelText = labelElement.find(".label-text");
    expect(labelText.text()).toBe(label);
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mountBaseInput({
      modelValue: "",
    });

    const input = wrapper.find("input");
    await input.setValue("New Value");

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0]).toEqual(["New Value"]);
  });

  it("applies custom input type", () => {
    const wrapper = mountBaseInput({
      modelValue: "",
      type: "password",
    });

    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("password");
  });

  it("applies custom input class", () => {
    const customClass = "custom-input-class";
    const wrapper = mountBaseInput({
      modelValue: "",
      inputClass: customClass,
    });

    const input = wrapper.find("input");
    expect(input.classes()).toContain(customClass);
  });

  it("sets required attribute", () => {
    const wrapper = mountBaseInput({
      modelValue: "",
      required: true,
    });

    const input = wrapper.find("input");
    expect(input.attributes("required")).toBeDefined();
  });

  it("sets aria-label when no label is provided", () => {
    const wrapper = mountBaseInput({
      modelValue: "",
    });

    const input = wrapper.find("input");
    expect(input.attributes("aria-label")).toBeDefined();
  });

  it("passes through additional attributes", () => {
    const attributes = {
      "data-testid": "custom-input",
      disabled: true,
      placeholder: "Enter text",
    };
    const wrapper = mountBaseInput({
      ...attributes,
    });

    const input = wrapper.find("input");

    console.log("input", input.attributes("placeholder"));
    expect(input.attributes("placeholder")).toBe("Enter text");
    expect(input.attributes("data-testid")).toBe("custom-input");
    expect(input.attributes("disabled")).toBeDefined();
  });
});
