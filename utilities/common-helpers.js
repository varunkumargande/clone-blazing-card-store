import axiosRequest from "axios";
import { getImageSignedUrl } from "../api/common/common";
import { modalWarning } from "../api/intercept";
import DefaultConstants from "./constants";

export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const getFileNameAndExtension = (fileName, validFileExtensions) => {
    let file = {};
    var _validFileExtensions = validFileExtensions || [".jpg", ".jpeg", ".png"];
    for (var j = 0; j < _validFileExtensions.length; j++) {
        var extension = _validFileExtensions[j];
        if (fileName.substr(fileName.length - extension.length, extension.length).toLowerCase() == extension.toLowerCase()) {
            file.name = fileName.substr(0, fileName.length - extension.length).toLowerCase()
            file.extension = extension
            break;
        }
    }
    return file
}

export const uploadImageToServer = async (file) => {
    try {
        const { name, extension } = getFileNameAndExtension(file.name)
        const { type } = file;
        const time = new Date().getTime();
        const fileName  = `${time}_${name}${extension}`
        const signedUrl = await getImageSignedUrl({ path: DefaultConstants.CommonConstants.IMAGE_UPLOAD_PATH, key: fileName });
        if (signedUrl?.url) {
            const signedRequest = signedUrl.url;
            const options = { headers: { "Content-Type": type } };
            const s3Response = await axiosRequest.put(signedRequest, file, options);
            return { ...s3Response, fileName };
        }
        return false
    } catch (error) {
        modalWarning('error', error);
        return false
    }
}