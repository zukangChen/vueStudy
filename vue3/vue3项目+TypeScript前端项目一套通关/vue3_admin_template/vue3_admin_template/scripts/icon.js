// const puppeteer = require('puppeteer');
// const path = require('path');
// const fs = require('fs-extra');
// const compressing = require('compressing');
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs-extra'
import compressing from 'compressing'
// 默认超时时间：30秒，Puppeteer打开Browser和Page的超时，下载图标库压缩包超时
const timeout = 30000
const { loginUrl, projectLibraryUrl } = {
  timeout: 30000, // 超时时间
  loginUrl: 'https://www.iconfont.cn/login', //登录页面url
  loginRequestUrl: 'https://www.iconfont.cn/api/account/login.json', // 登录请求url
  projectLibraryUrl:
    'https://www.iconfont.cn/manage/index?manage_type=myprojects', // 项目管理url
  detailRequestUrl: 'https://www.iconfont.cn/api/project/detail.json',
}

// 获取绝对路径 && 路径拼接
const resolvePath = (filePath) => path.resolve(__dirname, filePath)
const joinPath = (...args) => path.join(...args)

/**
 * @description 输入一个图标库的信息，使用puppeteer模拟登录，下载图标并解压到相应目录
 * @param {String}  id 项目id
 * @param {String}  name 项目名称
 * @param {String}  user 账号（暂时只支持手机号）
 * @param {String}  password 密码
 * @param {String}  filePath 文件保存地址
 */
const downloadScript = async (id, name, user, password, filePath) => {
  // 打开Browser和Page
  let browser = await puppeteer.launch({
    headless: true,
    timeout,
    defaultViewport: {
      // 默认视窗较小，宽高建议设置一下，防止页面需要滚动或者样式乱
      width: 1366,
      height: 768,
    },
  })
  let page = await browser.newPage()
  // 跳转到登录页面，输入账号密码，点击登录按钮
  await page.goto(loginUrl, { waitUntil: 'networkidle0' })
  spinner.start(chalk.green('开始登录'))
  await page.type('#userid', user, { delay: 50 })
  await page.type('#password', password, { delay: 50 })
  await page.click('.mx-btn-submit')

  // 登录成功后，打开项目链接
  await page.goto(`${projectLibraryUrl}&projectId=${id}`, {
    waitUntil: 'networkidle0',
  })

  // 通过CDP会话设置下载路径，理论上也支持相对路径，已经拼好了绝对路径，当然建议使用绝对路径
  let savePath = resolvePath(filePath)
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow', //允许下载请求
    downloadPath: savePath, //设置下载路径
  })

  // 点击"下载至本地"按钮
  await page.click('.project-manage-bar a')
  const start = Date.now(),
    zipPath = joinPath(savePath, 'download.zip')
  while (!fs.existsSync(zipPath)) {
    // 每隔一秒轮询一次，查看download.zip文件是否下载完毕，超时时间设为30秒
    await page.waitForTimeout(1000)
    if (Date.now() - start >= timeout) {
      throw new Error('下载超时')
    }
  }
  console.log('图标下载成功！')
  await page.close()
  await browser.close()

  // 解压 => 删除 => 重命名
  await compressingZip(savePath)
  await deleteDir(savePath)
  await renameDir(savePath)
  console.log('图标库更新完成！')
}

// 解压download.zip变成font_XXX的文件夹
async function compressingZip(savePath) {
  await compressing.zip.uncompress(joinPath(savePath, 'download.zip'), savePath)
}

// 删除原有iconfont文件夹和下载的download.zip
async function deleteDir(savePath) {
  let iconfontFolder = joinPath(savePath, 'iconfont')
  let zipFile = joinPath(savePath, 'download.zip')
  fs.existsSync(iconfontFolder) && (await fs.remove(iconfontFolder))
  fs.existsSync(zipFile) && (await fs.remove(zipFile))
}

// 将font_XXX的文件夹重命名为iconfont
async function renameDir(savePath) {
  const dirs = fs.readdirSync(savePath)
  for (let dir of dirs) {
    if (dir.startsWith('font_')) {
      await fs.rename(joinPath(savePath, dir), joinPath(savePath, 'iconfont'))
      break
    }
  }
}

module.exports = downloadScript
