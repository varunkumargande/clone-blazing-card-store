import React from "react";
import IconMasterCard from "../Icons/IconMasterCard";
import {
  IconAmericanExpressCard,
  IconVisaCard,
  IconDankortCard,
  IconDCICard,
  IconDiscoverCard,
  IconJCBCard,
  IconMaestroCard,
  IconUnionPayCard,
} from "../Icons/IconAllBankCards";
import { cardRegex } from "../Constants/regex";

export const stringFormatter = (string) => {
  return string
    ? string.toLowerCase().charAt(0).toUpperCase() +
        string.toLowerCase().slice(1)
    : "";
};

export const getCardImagesByName = (cardNumber = "", cardBrand = "") => {
  const number = cardNumber.toString().replaceAll(" ", "");
  const getImage = (key) => {
    switch (key) {
      case "visa":
        return <IconVisaCard />;
      case "mastercard":
        return <IconMasterCard />;
      case "amex":
        return <IconAmericanExpressCard />;
      case "dankort":
        return <IconDankortCard />;
      case "diners":
        return <IconDCICard />;
      case "discover":
        return <IconDiscoverCard />;
      case "jcb":
        return <IconJCBCard />;
      case "maestro":
        return <IconMaestroCard />;
      case "unionpay":
        return <IconUnionPayCard />;
      default:
        return "";
    }
  };
  if (cardRegex[`${cardBrand}`]) {
    return getImage(cardBrand);
  } else if (number) {
    for (const key in cardRegex) {
      if (cardRegex[key].test(number)) {
        return getImage(key);
      }
    }
  }
  return "";
};
