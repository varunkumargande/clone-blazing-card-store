import APIServices from '../../services'

export const getImageSignedUrl = async (payLoad) => {
  const result = await APIServices.put(`media/get-presigned-url-s3?path=${payLoad.path}&key=${payLoad.key}`)
  if (result && result.data && result.data) {
    return result.data;
  }
  return false
}