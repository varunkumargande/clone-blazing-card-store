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
                    ImageURL += ApplyWidth(width);
                }
                if(height && height > 0) {
                    ImageURL += ApplyHeight(height);
                }
                return ImageURL;
            } else if(details.imagePath && details.image) {
                ImageURL += GetImageAPIPath(details.imagePath);
                ImageURL += GetImageAPIName(details.image);
                if(width && width > 0) {
                    ImageURL += ApplyWidth(width);
                }
                if(height && height > 0) {
                    ImageURL += ApplyHeight(height);
                }
                return ImageURL;
            } else if(details.stream_thumbnail_path && details.stream_thumbnail_image) {
                ImageURL += GetImageAPIPath(details.stream_thumbnail_path);
                ImageURL += GetImageAPIName(details.stream_thumbnail_image);
                if(width && width > 0) {
                    ImageURL += ApplyWidth(width);
                }
                if(height && height > 0) {
                    ImageURL += ApplyHeight(height);
                }
                return ImageURL;
            } else {
                return GetDefaulterImageURL(type);
            }
        }  else if(type == "vendor") {
            if(details.vendor_image_path && details.vendor_image) {
                ImageURL += GetImageAPIPath(details.vendor_image_path);
                ImageURL += GetImageAPIName(details.vendor_image);
                if(width && width > 0) {
                    ImageURL += ApplyWidth(width);
                }
                if(height && width > 0) {
                    ImageURL += ApplyHeight(height);
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

const ApplyWidth = (width) => {
    return "&width=" + width;
}
const ApplyHeight = (height) => {
    return "&height=" + height;
}

const GetDefaulterImageURL = (type) => {
    if(type !== "vendor") {
        return '/static/images/card.png';
    }
    return '/static/img/no-image-new.png';
}

const DefaultServices = {
    GetDefaulterImageURL,
    GetFullImageURL
};

export default DefaultServices;