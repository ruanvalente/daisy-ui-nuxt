import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Card from "~/components/ui/Card/Card.vue";
import { CARD_OPTIONS } from "~/constants/Card/Card";

type TypeProps = {
  [key: string]: any;
};

type CardType = {
  props: TypeProps;
};

const mountCard = (props: TypeProps = {}) =>
  mount(Card, {
    props: {
      ...props,
    },
  });

describe("<Card />", () => {
  it("renders the card component", () => {
    const wrapper = mountCard();

    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders correct number of cards", () => {
    const wrapper = mountCard();

    const cardElements = wrapper.findAll(".card");
    expect(cardElements.length).toBe(CARD_OPTIONS.length);
  });

  it("renders card details correctly", () => {
    const wrapper = mountCard();

    CARD_OPTIONS.forEach((cardOption, index) => {
      const cardElement = wrapper.findAll(".card")[index];
      const cardText = cardElement.text();

      expect(cardText).toContain(cardOption.title);

      const iconElement = cardElement.find(
        `i.${cardOption.icon.split(" ").join(".")}`
      );
      expect(iconElement.exists()).toBeTruthy();

      const valueElement = cardElement.find("p.py-2.font-bold.text-base");
      expect(valueElement.text()).toBe(cardOption.value);

      const contentElements = cardElement.findAll("p.text-base");
      const contentText = contentElements[1].text();
      expect(contentText).toContain(
        cardOption.content.split(" ").slice(1).join(" ")
      );
    });
  });
});
