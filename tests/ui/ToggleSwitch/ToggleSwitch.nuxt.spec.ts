import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ToggleSwitch from "~/components/ui/ToggleSwitch/ToggleSwitch.vue";

type ToggleSwitchType = {
  modelValue: boolean;
};

const modalValueMockProps = {
  modalValue: false,
};

const mountToggleSwitch = (props: ToggleSwitchType) =>
  mount(ToggleSwitch, {
    props: {
      ...props,
    },
  });

describe("<ToggleSwitch />", () => {
  it("renders properly", () => {
    const wrapper = mountToggleSwitch({
      modelValue: false,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("emits update:modelValue with true when toggled on", async () => {
    const wrapper = mountToggleSwitch({ modelValue: false });

    const input = wrapper.find("input");
    await input.setChecked(true);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
  });

  it("emits update:modelValue with false when toggled off", async () => {
    const wrapper = mountToggleSwitch({ modelValue: true });

    const input = wrapper.find("input");
    await input.setChecked(false);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
  });

  it("reflects the modelValue prop correctly", async () => {
    const wrapper = mountToggleSwitch({ modelValue: true });

    const input = wrapper.find("input");
    expect(input.element.checked).toBe(true);

    await wrapper.setProps({ modelValue: false });
    expect(input.element.checked).toBe(false);
  });
});
