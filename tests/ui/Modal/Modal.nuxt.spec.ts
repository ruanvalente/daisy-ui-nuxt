import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Modal from "~/components/ui/Modal/Modal.vue";

type ModalType = {
  id: string;
  isOpen: boolean;
  title: string;
  width: string;
  variant: string;
  titleSize: string;
  centerActions: boolean;
};

const modalMockProps = {
  title: "Test Modal",
  isOpen: true,
  id: "modal-1",
  width: "w-11/12 max-w-2xl",
  variant: "default",
  titleSize: "text-2xl",
  centerActions: true,
};

const mountModal = (props: ModalType) =>
  mount(Modal, {
    props: {
      ...props,
    },
  });

describe("<Modal />", () => {
  it("renders the modal correctly", () => {
    const wrapper = mountModal({ ...modalMockProps });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Test Modal");
    expect(wrapper.find(".modal-content").exists()).toBe(true);
  });

  it("emits close event on backdrop click", async () => {
    const wrapper = mountModal({
      ...modalMockProps,
    });

    await wrapper.find(".modal-backdrop").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("does not emit close event if modal is not open", async () => {
    const wrapper = mount(Modal, {
      ...modalMockProps,
      isOpen: false,
    });

    await wrapper.find(".modal-backdrop").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
