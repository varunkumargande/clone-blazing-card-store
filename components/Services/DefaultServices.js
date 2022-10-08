import { imageUrl } from '../../api/url';
// import DefaultImage from '/static/img/no-image.png';

const GetFullImageURL = (details, type, width, height) => {
    let ImageURL = imageUrl;
    if(details) {
        if(type == "profile") {
            if(details.preview_image_path && details.preview_image) {
                ImageURL += GetImageAPIPath(details.preview_image_path);
                ImageURL += GetImageAPIName(details.preview_image);
                if(width && width > 0) {
                    ImageURL += ApplyWidth(ImageURL, width);
                }
                if(width && width > 0) {
                    ImageURL += ApplyHeight(ImageURL, height);
                }
                return ImageURL;
            } else {
                return GetDefaulterImageURL(type);
            }
        }
        if(type == "vendor") {
            if(details.vendor_image_path && details.vendor_image) {
                ImageURL += GetImageAPIPath(details.vendor_image_path);
                ImageURL += GetImageAPIName(details.vendor_image);
                if(width && width > 0) {
                    ImageURL += ApplyWidth(ImageURL, width);
                }
                if(width && width > 0) {
                    ImageURL += ApplyHeight(ImageURL, height);
                }
                return ImageURL;
            } else {
                return GetDefaulterImageURL(type);
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

const ApplyWidth = (path, width) => {
    return path += "&width=" + width
}
const ApplyHeight = (path, height) => {
    return path += "&height=" + height
}

const GetDefaulterImageURL = (type) => {
    if(type !== "vendor") {
        return '/static/img/no-image.png';
    }
    return '/static/img/no-image-new.png';
}

const DefaultServices = {
    GetDefaulterImageURL,
    GetFullImageURL
};

export default DefaultServices;