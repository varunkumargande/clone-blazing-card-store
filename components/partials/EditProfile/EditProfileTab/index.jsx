import React, {useState} from "react";

export default function EditProfileTab({ setActiveTab, activeTab }) {
  const [editProfileTabList, setEditProfileTabList] = useState([
    {
      type: "PROFILE",
      name: "Profile Information",
    },
    {
      type: "PASSWORD",
      name: "Change Password",
    },
    {
      type: "SHIPPING",
      name: "Shipping Information",
    },
    {
      type: "PAYMENT",
      name: "Payment Details",
    },
  ]);

  return (
    <>
      <div className="tab-link-wrap flex mb32">
        {editProfileTabList.map((item, index) => {
          return (
            <>
              <div className="tab-link">
                <button
                  className={activeTab === item.type ? "title active" : "title"}
                  id="profile-info"
                  onClick={() => setActiveTab(item.type)}
                >
                  {item.name}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
