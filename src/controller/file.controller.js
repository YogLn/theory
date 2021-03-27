const fileService = require('../service/file.service')
const userService = require('../service/user.service');
const { APP_HOST, APP_PORT } = require('../app/config');

class FileControl {
  async saveAvatarInfo (ctx, next) {
    // console.log(ctx.req.file);
    // 1. 获取图像的信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    // 2. 将图像数据保存到数据库中
    const res = await fileService.createAvatar(filename, mimetype, size, id)

    // 3. 将图像保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    console.log(avatarUrl);
    await userService.updateAvatarUrlById(avatarUrl, id)
    ctx.body = {
      status: 200
    }
  }

  async savePictureInfo (ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }

    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileControl()
