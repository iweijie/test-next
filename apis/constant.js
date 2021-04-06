export const apis = {
  // 主页背景图列表
  getBgImageList: {
    url: '/api/recommend/image/zr',
  },
  // 文章列表
  getArticleList: {
    url: '/api/article/list',
  },
  // 获取文章详情
  getArticleDetails: {
    url: '/api/article/get',
    method: 'get',
  },
  // 新增文章
  addArticle: {
    url: '/api/article/add',
    method: 'post',
  },
  // 更新文章查看次数
  updateArticlTime: {
    url: '/api/article/time',
    method: 'post',
  },
  // 获取推荐文章列表
  getRecommendArticl: {
    url: '/api/article/recommend',
    method: 'post',
  },
  // 新增 or 编辑 标签
  addOrUpdateTag: {
    url: '/api/tags/add',
    method: 'post',
  },
  // 获取标签列表
  getTagList: {
    url: '/api/tags/list',
    method: 'post',
  },
  // 获取标签详情列表
  getDetailTagList: {
    url: '/api/tags/detailList',
    method: 'post',
  },

  /**   文件   */

  // 文件上传
  fileUpload: {
    url: '/api/fileupload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  // 获取上传文件列表
  getUploadFileList: {
    url: '/api/file/list',
  },

  /**   碎碎恋   */

  // 新增碎碎恋
  addSelftalking: {
    url: '/api/selftalking/add',
    method: 'post',
  },

  // 碎碎恋列表
  getSelftalkingList: {
    url: '/api/selftalking/list',
    method: 'post',
  },
  /**   登入   */
  login: {
    url: '/api/login/account',
    method: 'post',
  },
  getUserInfo: {
    url: '/api/login/check',
    method: 'post',
  },
};

export const prefix =
  process.env.NODE_ENV !== 'production'
    ? {
        basicsUrl: 'https://blogapi.iweijie.cn',
        fileUrl: 'https://file.iweijie.cn',
      } || {
        basicsUrl: 'http://localhost:8002',
        fileUrl: 'http://localhost:8001',
      }
    : {
        basicsUrl: 'https://blogapi.iweijie.cn',
        fileUrl: 'https://file.iweijie.cn',
      };

export const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  mode: 'cors',
  timeout: 10000,
};
