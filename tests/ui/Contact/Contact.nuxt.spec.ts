import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Contact from "~/components/ui/Contact/Contact.vue";

type TypeProps = {
  contactInfo: {
    subjects: string[];
    officeLocations: {
      name: string;
      address: string;
      phone: string;
      email: string;
    }[];
    businessHours: Record<string, string>;
    socialMedia: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
};

type ContactType = {
  props: TypeProps;
};

const mockContactInfo: TypeProps["contactInfo"] = {
  subjects: ["General Inquiry", "Support", "Sales"],
  officeLocations: [
    {
      name: "Main Office",
      address: "123 Main St, Anytown, USA",
      phone: "+1 (555) 123-4567",
      email: "main@company.com",
    },
  ],
  businessHours: {
    "Monday-Friday": "9:00 AM - 5:00 PM",
    Saturday: "10:00 AM - 2:00 PM",
    Sunday: "Closed",
  },
  socialMedia: [
    {
      name: "Facebook",
      url: "https://facebook.com/company",
      icon: "fab fa-facebook",
    },
  ],
};

const mountContact = (props: TypeProps = { contactInfo: mockContactInfo }) =>
  mount(Contact, {
    props: {
      ...props,
    },
  });

describe("<Contact />", () => {
  it("renders the contact component", () => {
    const wrapper = mountContact();

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders form inputs correctly", () => {
    const wrapper = mountContact();

    const nameInput = wrapper.findComponent({
      name: "BaseInput",
      props: { label: "Name" },
    });
    expect(nameInput.exists()).toBeTruthy();

    const emailInput = wrapper.findComponent({
      name: "BaseInput",
      props: { label: "E-mail" },
    });
    expect(emailInput.exists()).toBeTruthy();

    const subjectSelect = wrapper.findComponent({
      name: "BaseSelect",
      props: { label: "Subject" },
    });
    expect(subjectSelect.exists()).toBeTruthy();
  });

  it("renders subject options correctly", () => {
    const wrapper = mountContact();

    const subjectSelect = wrapper.findComponent({ name: "BaseSelect" });
    const options = subjectSelect.props("options");

    expect(options).toHaveLength(mockContactInfo.subjects.length);
    mockContactInfo.subjects.forEach((subject, index) => {
      expect(options[index]).toEqual({ value: subject, text: subject });
    });
  });

  it("emits submit event with form data", async () => {
    const wrapper = mountContact();

    const nameInput = wrapper.findComponent({
      name: "BaseInput",
      props: { label: "Name" },
    });
    const emailInput = wrapper.findAll('input[type="email"]');
    const subjectSelect = wrapper.findComponent({ name: "BaseSelect" });
    const messageTextarea = wrapper.find("textarea");

    // Simulate user input
    await nameInput.setValue("John Doe");
    await emailInput[0].setValue("john@example.com");
    await subjectSelect.setValue(mockContactInfo.subjects[0]);
    await messageTextarea.setValue("Test message");

    // Submit the form
    const form = wrapper.find("form");
    await form.trigger("submit.prevent");

    // Check if submit event was emitted with correct data
    const emittedEvents = wrapper.emitted("submit");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[0][0]).toEqual({
      name: "John Doe",
      email: "john@example.com",
      subject: mockContactInfo.subjects[0],
      message: "Test message",
    });
  });
});
