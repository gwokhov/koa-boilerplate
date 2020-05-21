const path = require('path')

module.exports = {
  async upload(ctx) {
    const file = ctx.request.files.file
    const baseName = path.basename(file.path)
    ctx.body = {
      url: `${ctx.origin}/uploads/${baseName}`
    }
  }
}
