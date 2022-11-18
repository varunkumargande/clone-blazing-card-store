export const limit = 10;
export const US_CODE = "223";

// Become a seller constants
export const stepState = [
  "guidelines",
  "basicDetails",
  "paymentDetails",
  "shippingDetails",
  "submitted",
];

//Api constants
export const apiConstant = {
  vendor: {
    VENDOR_AUTH_TYPE: "vendl",
    VENDOR_AUTH_API: "store-vendor/commonLogin",
    VENDOR_LOGIN_URL: `${process.env.NEXT_PUBLIC_VENDOR_LOGIN_URL}#/dashboard`,
  },
};

//category constants
export const categoryConstant = {
  homeTag: "Explore",
  headingTag: "Categories",
  viewTag: "View All",
  categoryData: 0,
  url: {
    path: "/see-all",
    page: "allCategory",
  },
  LIVE_DATA: {
    type: 1,
    limit: 10,
  },
  SCHEDULE_DATA: {
    type: 2,
    limit: 10,
  },
  CATEGORY_DATA: {
    type: 3,
  },
  SUB_CATEGORY_DATA: {
    type: 4,
  },
};

//chat constants
export const chatConstant = {
  localStorageKey: "chat-app-current-user",
};

//Public profile constants
const VendorTabs = [
  {
    title: "Upcoming Shows",
    key: "upcoming-shows",
  },
  {
    title: "Previous Shows",
    key: "previous-shows",
  },
  {
    title: "Followers",
    key: "followers",
  },
  {
    title: "Following",
    key: "following",
  },
];

const BuyerTabs = [
  {
    title: "Liked Shows",
    key: "liked-shows",
  },
  {
    title: "Following",
    key: "following",
  },
  {
    title: "Followers",
    key: "followers",
  },
];

const PublicProfileConstants = {
  VendorTabs,
  BuyerTabs,
};

export default PublicProfileConstants;

// Social media links
export const SocialMediaShareLink = {
  whatsapp: "https://wa.me/?text=",
  twitter: "https://twitter.com/home?status=",
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
};
