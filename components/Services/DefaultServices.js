import { imageUrl } from '../../api/url';
// import DefaultImage from '/static/img/no-image.png';

const GetFullImageURL = (details, type) => {
    if (details) {
        if (type == "profile") {
            if (details.preview_image_path && details.preview_image) {
                return details.preview_image_path + "/" + details.preview_image
            } else if (details.imagePath && details.image) {
                return details.imagePath + "/" + details.image
            } else if (details.stream_thumbnail_path && details.stream_thumbnail_image) {
                return details.stream_thumbnail_path + '/' + details.stream_thumbnail_image
            } else if (details.avatarPath && details.avatar) {
                return details.avatarPath + "/" + details.avatar
            } else if(details?.following_avatar_path && details?.following_avatar){
                return details?.following_avatar_path + "/" + details?.following_avatar
            } 
            else if(details?.follower_avatar_path && details?.follower_avatar){
                return details?.follower_avatar_path + "/" + details?.follower_avatar
            } 
            else {
                return 'defaultCard.png';
            }
        } else if (type == "vendor") {
            if (details.vendor_image_path && details.vendor_image) {
                return details.vendor_image_path + "/" + details.vendor_image
            } else if (details.follower_avatar_path && details.follower_avatar) {
                return details.follower_avatar_path + '/' + details.follower_avatar
            } else if ((details.avatarPath || details.avatar_path) && details.avatar) {
                return (details.avatarPath ?? details.avatar_path) + "/" + details.avatar
            } else if (details.following_avatar_path && details.following_avatar) {
                return details.following_avatar_path + "/" + details.following_avatar
            } else {
                return "defaultCard.png";
            }
        }
    }
    return false;
} 

const GetImageAPIPath = (path) => {
    return "?path=" + path;
}

const GetImageAPIName = (name) => {
    return  "&name=" + name;
}

const ApplyWidth = (width) => {
    return "&width=" + width;
}
const ApplyHeight = (height) => {
    return "&height=" + height;
}

const DefaultServices = {
    GetFullImageURL
};

export default DefaultServices;