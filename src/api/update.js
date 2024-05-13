import request from '@/utils/request'

const updateApi = {
  uploadMedia: '/client_group/upload/uploadMedia', // 上传文件到企业微信，得到阿里云地址和mediaId

}

export function uploadMedia(parameter) {
  return request({
      url: updateApi.uploadMedia,
      method: 'post',
      data: parameter,
  })
}