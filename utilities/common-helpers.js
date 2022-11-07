import axiosRequest from "axios";
import { getImageSignedUrl } from "../api/common/common";
import { modalWarning } from "../api/intercept";

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

export const uploadImageToServer = async (file, path) => {
    try {
        const { name, extension } = getFileNameAndExtension(file.name)
        const { type } = file;
        const time = new Date().getTime();
        const fileName  = `${time}_${name}${extension}`
        const signedUrl = await getImageSignedUrl({ path, key: fileName });
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

/**
 * @method: dateFormatSeperator
 * @description: this function help in adding '/' between month and year when user 
 *               types the number in date field(Ex: 12/25)
 */
export const dateFormatSeperator = (date) => {
    if (!!date) {
        return date
            .replace(/^(\d\d)(\d)$/g, "$1/$2")
            .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
            .replace(/[^\d\/]/g, "")
            .trim();
    }
    return date;
};

/**
 * @method: getErrorMessage
 * @description: this function receive the response and according to it
 *                returns the error message which can be displayed.
 */
export const getErrorMessage = (response) => {
    return response?.data?.data?.message || response?.data?.message || 'Something went wrong!'
}