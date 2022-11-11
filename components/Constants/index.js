export const limit = 10;
export const US_CODE = "223";

export const stepState = [
    "guidelines",
    "basicDetails",
    "paymentDetails",
    "shippingDetails",
    "submitted"
  ];

  export const apiConstant = {
    vendor: {
      VENDOR_AUTH_TYPE: "vendl",
      VENDOR_AUTH_API: "store-vendor/commonLogin",
      VENDOR_LOGIN_URL:
        `${process.env.NEXT_PUBLIC_VENDOR_LOGIN_URL}#/dashboard`,
    },
  };
  
  export const categoryConstant = {
    "homeTag": "Explore",
    "headingTag": "Categories",
    "viewTag":"View All",
    "categoryData":0,
    "url": {
        "path":"/see-all",
        "page": "allCategory"
    },
    "LIVE_DATA":{
        "type": 1,
        "limit": 10
    },
    "SCHEDULE_DATA":{
        "type": 2,
        "limit": 10
    },
    "CATEGORY_DATA":{
        "type": 3
    },
    "SUB_CATEGORY_DATA":{
        "type": 4
    },
}
