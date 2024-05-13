import request from '@/utils/requestPython'

const userApi = {
  toTitle: '/api/crawl/moviepy/video', //视频列表
  material: '/api/crawl/moviepy/material', //图片列表
  copywriting: '/api/crawl/moviepy/copywriting', //文案列表
  export_copywriting: '/api/crawl/copywriting/export', //文案导出
  uploadImg: '/api/crawl/moviepy/upload', //图片上传
  concatenate: '/api/crawl/moviepy/concatenate', //视频生成
  voiceList: '/api/crawl/voice/list', //语音列表
  create_chat: '/api/crawl/openai/chat',
  tag: '/api/crawl/openai/tag', //标签管理
  seo: '/api/crawl/openai/seo', //seo管理
  export_seo: '/api/crawl/openai/seo/export', //seo导出
  kol_list: '/api/crawl/kol/tiktok',
  type_chat: '/api/crawl/openai/chat/type', //聊天类型
  text_tag: '/api/crawl/moviepy/copywriting/tag', //文案标签
  upload_multi: '/api/crawl/moviepy/copywriting/multi', //多文案上传
  tk_topic: '/api/crawl/kol/tiktok/topic',
  get_live: '/api/crawl/kol/tiktok/live', //TK 直播
  get_audio: '/api/crawl/audio', //语音文件列表
  text_to_speech: '/api/crawl/audio/text_to_speech', //根据文本及语言类型转语音
  picture_video: '/api/crawl/picture/video', //图片视频管理
  animations: '/api/crawl/d-id/animations', //AI头像图片
  talks: '/api/crawl/d-id/talks', //图片+人动的视频管理
  video_video: '/api/crawl/video/video', //短视频生成视频任务
  keyword: '/api/crawl/seo/keyword', //关键词
  title: '/api/crawl/seo/title', //标题模板
  generate: '/api/crawl/seo/title/generate', //批量组合标题
  get_export: '/api/crawl/seo/export', //seo导出记录
  stable_diffusion: '/api/crawl/stable/diffusion', //ai图片

  iseapi: '/api/crawl/audio/iseapi', //生成报告
  uploadVideo: 'https://hk.api.kolify.cn/13r06fsz/api/crawl/audio', //语音上传
}


export function add_stable_diffusion(parameter) {
  return request({
    url: userApi.stable_diffusion,
    method: 'post',
    data: parameter
  })
}
export function get_stable_diffusion(parameter) {
  return request({
    url: userApi.stable_diffusion,
    method: 'get',
    params: parameter
  })
}

export function export_copywriting(parameter) {
  return request({
    url: userApi.export_copywriting,
    method: 'post',
    data: parameter
  })
}
export function get_export(parameter) {
  return request({
    url: userApi.get_export,
    method: 'get',
    params: parameter
  })
}

export function generate(parameter) {
  return request({
    url: userApi.generate,
    method: 'post',
    data: parameter
  })
}

export function edit_title(parameter) {
  return request({
    url: userApi.title,
    method: 'put',
    data: parameter
  })
}

export function del_title(parameter) {
  return request({
    url: userApi.title,
    method: 'delete',
    data: parameter
  })
}
export function add_title(parameter) {
  return request({
    url: userApi.title,
    method: 'post',
    data: parameter
  })
}

export function get_title(parameter) {
  return request({
    url: userApi.title,
    method: 'get',
    params: parameter
  })
}

export function edit_keyword(parameter) {
  return request({
    url: userApi.keyword,
    method: 'put',
    data: parameter
  })
}

export function del_keyword(parameter) {
  return request({
    url: userApi.keyword,
    method: 'delete',
    data: parameter
  })
}
export function add_keyword(parameter) {
  return request({
    url: userApi.keyword,
    method: 'post',
    data: parameter
  })
}

export function get_keyword(parameter) {
  return request({
    url: userApi.keyword,
    method: 'get',
    params: parameter
  })
}

export function export_seo(parameter) {
  return request({
    url: userApi.export_seo,
    method: 'post',
    data: parameter
  })
}

export function add_video(parameter) {
  return request({
    url: userApi.video_video,
    method: 'post',
    data: parameter
  })
}

export function get_video(parameter) {
  return request({
    url: userApi.video_video,
    method: 'get',
    params: parameter
  })
}
export function del_video(parameter) {
  return request({
    url: userApi.video_video,
    method: 'delete',
    data: parameter
  })
}

export function add_talks(parameter) {
  return request({
    url: userApi.talks,
    method: 'post',
    data: parameter
  })
}

export function get_talks(parameter) {
  return request({
    url: userApi.talks,
    method: 'get',
    params: parameter
  })
}
export function del_talks(parameter) {
  return request({
    url: userApi.talks,
    method: 'delete',
    data: parameter
  })
}
export function add_animations(parameter) {
  return request({
    url: userApi.animations,
    method: 'post',
    data: parameter
  })
}

export function get_animations(parameter) {
  return request({
    url: userApi.animations,
    method: 'get',
    params: parameter
  })
}

export function add_picture_video(parameter) {
  return request({
    url: userApi.picture_video,
    method: 'post',
    data: parameter
  })
}

export function get_picture_video(parameter) {
  return request({
    url: userApi.picture_video,
    method: 'get',
    params: parameter
  })
}
export function del_picture_video(parameter) {
  return request({
    url: userApi.picture_video,
    method: 'delete',
    data: parameter
  })
}
export function text_to_speech(parameter) {
  return request({
    url: userApi.text_to_speech,
    method: 'post',
    data: parameter
  })
}

export function get_audio(parameter) {
  return request({
    url: userApi.get_audio,
    method: 'get',
    params: parameter
  })
}
export function del_audio(parameter) {
  return request({
    url: userApi.get_audio,
    method: 'delete',
    data: parameter
  })
}
export function tk_topic(parameter) {
  return request({
    url: userApi.tk_topic,
    method: 'get',
    params: parameter
  })
}

export function add_live(parameter) {
  return request({
    url: userApi.get_live,
    method: 'post',
    data: parameter
  })
}

export function get_live(parameter) {
  return request({
    url: userApi.get_live,
    method: 'get',
    params: parameter
  })
}

export function upload_multi(parameter) {
  return request({
    url: userApi.upload_multi,
    method: 'post',
    data: parameter
  })
}
export function text_tag(parameter) {
  return request({
    url: userApi.text_tag,
    method: 'put',
    data: parameter
  })
}
export function del_type_chat(parameter) {
  return request({
    url: userApi.type_chat,
    method: 'delete',
    data: parameter
  })
}
export function edit_type_chat(parameter) {
  return request({
    url: userApi.type_chat,
    method: 'put',
    data: parameter
  })
}
export function type_chat(parameter) {
  return request({
    url: userApi.type_chat,
    method: 'get',
    params: parameter
  })
}

export function kol_list(parameter) {
  return request({
    url: userApi.kol_list,
    method: 'get',
    params: parameter
  })
}

export function get_seo(parameter) {
  return request({
    url: userApi.seo,
    method: 'get',
    params: parameter
  })
}

export function add_seo(parameter) {
  return request({
    url: userApi.seo,
    method: 'post',
    data: parameter
  })
}

export function del_seo(parameter) {
  return request({
    url: userApi.seo,
    method: 'delete',
    data: parameter
  })
}
export function edit_seo(parameter) {
  return request({
    url: userApi.seo,
    method: 'put',
    data: parameter
  })
}

export function get_tag(parameter) {
  return request({
    url: userApi.tag,
    method: 'get',
    params: parameter
  })
}

export function add_tag(parameter) {
  return request({
    url: userApi.tag,
    method: 'post',
    data: parameter
  })
}

export function del_tag(parameter) {
  return request({
    url: userApi.tag,
    method: 'delete',
    data: parameter
  })
}
export function edit_tag(parameter) {
  return request({
    url: userApi.tag,
    method: 'put',
    data: parameter
  })
}
export function get_chat(parameter) {
  return request({
    url: userApi.create_chat,
    method: 'get',
    params: parameter
  })
}

export function del_chat(parameter) {
  return request({
    url: userApi.create_chat,
    method: 'delete',
    data: parameter
  })
}

export function delVideo(parameter) {
  return request({
    url: userApi.toTitle,
    method: 'delete',
    data: parameter
  })
}

export function voiceList(parameter) {
  return request({
    url: userApi.voiceList,
    method: 'get',
    params: parameter
  })
}

export function concatenate(parameter) {
  return request({
    url: userApi.concatenate,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delmaterial(parameter) {
  return request({
    url: userApi.material,
    method: 'delete',
    data: parameter
  })
}

export function uploadImg(parameter) {
  return request({
    url: userApi.uploadImg,
    method: 'post',
    data: parameter
  })
}

export function copywriting(parameter) {
  return request({
    url: userApi.copywriting,
    method: 'get',
    params: parameter
  })
}

export function addcopywriting(parameter) {
  return request({
    url: userApi.copywriting,
    method: 'post',
    data: parameter
  })
}
export function editcopywriting(parameter) {
  return request({
    url: userApi.copywriting,
    method: 'put',
    data: parameter
  })
}

export function delcopywriting(parameter) {
  return request({
    url: userApi.copywriting,
    method: 'delete',
    data: parameter
  })
}
export function material(parameter) {
  return request({
    url: userApi.material,
    method: 'get',
    params: parameter
  })
}

export function getTitle(parameter) {
  return request({
    url: userApi.toTitle,
    method: 'get',
    params: parameter
  })
}

export function toTitle(parameter) {
  return request({
    url: userApi.toTitle,
    method: 'post',
    data: parameter
  })
}
export function iseapi(parameter) {
  return request({
    url: userApi.iseapi,
    method: 'post',
    data: parameter
  })
}
export function uploadVideo(parameter) {
  return request({
    url: userApi.uploadVideo,
    method: 'post',
    data: parameter
  })
}