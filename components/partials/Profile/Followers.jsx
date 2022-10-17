import React from "react";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
import DefaultServices from "../../Services/DefaultServices";

export default function Followers(props) {
  const { person, isFollower } = props;
  const renderProfileName = () => {
    if (person) {
      let name = "";
      if (isFollower) {
        if (person.follower_first_name) {
          name += person.follower_first_name;
        }
        if (person.follower_last_name) {
          name += " " + person.follower_last_name;
        }
      } else {
        if (person.following_first_name) {
          name += person.following_first_name;
        }
        if (person.following_last_name) {
          name += " " + person.following_last_name;
        }
      }
      return name;
    }
    return null;
  };
  return (
    <>
      <div className="card-list flex flex-center">
        <div className="profile text-center">
          <CloudinaryImage
            imageUrl={DefaultServices?.GetFullImageURL(
              person,
              "vendor",
            )}
            keyId={DefaultServices?.GetFullImageURL(
              person,
              "vendor",
            )}
            transformation={ImageTransformation.followersCard}
            alternative={"Card"}
          />
          {/* <img style={{ borderRadius:"50%" }} width="115" height="115" src={DefaultServices.GetFullImageURL(person, "vendor", "115", "115")} alt="Card" /> */}
          <div className="f-title">{renderProfileName()}</div>
          <div className="f-digi">
            @
            {person &&
              (isFollower
                ? person.follower_username
                : person.following_username)}
          </div>
          <div className="follow-button-wrapper">
            <button className="primary-btn">Follow</button>
          </div>
        </div>
      </div>
      {/* <div className="card-list flex flex-center">
                <div className="profile text-center">
                    <img src="/static/images/profile-large.svg" alt="Card" />
                    <div className="f-title">Stephen Curry</div>
                    <div className="f-digi">@felix.bronco</div>
                    <div className="follow-button-wrapper">
                        <button className="border-btn">Following</button>
                    </div>
                </div>
            </div> */}
    </>
  );
}
