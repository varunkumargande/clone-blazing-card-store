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
        return [key, <IconVisaCard />];
      case "mastercard":
        return [key, <IconMasterCard />];
      case "amex":
        return [key, <IconAmericanExpressCard />];
      case "dankort":
        return [key, <IconDankortCard />];
      case "diners":
        return [key, <IconDCICard />];
      case "discover":
        return [key, <IconDiscoverCard />];
      case "jcb":
        return [key, <IconJCBCard />];
      case "maestro":
        return [key, <IconMaestroCard />];
      case "unionpay":
        return [key, <IconUnionPayCard />];
      default:
        return [key, ""];
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
