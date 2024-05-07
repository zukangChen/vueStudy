import https from 'https'
import path from 'path'
import fs from 'fs'
import querystring from 'querystring'
import axios from 'axios'
const iconfontConfig = {
  // iconfont域名，固定的
  host: 'at.alicdn.com',
  // icon动态路径
  path: '',
  // 本地iconfont.js文件相对脚本文件的路径
  targetFilePath: path.join(import.meta.url, '../../assets/iconfont.js'),
  // 存放临时文件的路径
  tempFilePath: path.join(import.meta.url, './iconfont_tmp.js'),
}

// 请求最新的cdn地址
const getIconUrl = () => {
  const postData = querystring.stringify({
    pid: '1171477',
    t: Date.now(),
    ctoken: 'vdmHNEi9kog4XPluHQ2ziIPQ',
  })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie:
        'cna=Uit/HW1FQXMCAXxOmPUQWNE+; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlLc7wBKUayI7v2lorkTHK5_J1R5Htpl7WAOefIZMrIq5lJW1e6TXCn4jy-pzmCLdvjkBWeHkU1FjPS55LuPskPvCIT4AceELcDMYvIk-uLmOg==; ctoken=vdmHNEi9kog4XPluHQ2ziIPQ; u=5527282; u.sig=YbGe71iSdE0L0S4NHdERhkUwsDs78DnTmt9qlbIHGSw; xlly_s=1; tfstk=fKTSZR434pL2WmRfKghVledaxIbBJLgZdW1psBUz9aQ8pJdO3Q8PzBrBdKOOvURFye_Bhp9y4aKyA69wwpsnZ9WddpRp4juZ7QAl-wpIQVuZKOWZ-LZL2_hdD11GUKrzGQAl-SV4pc-vZk6vFNTRJpQAk_5hJ_CRJj_Aa6QLyMU8D-Bc9wBppTEYk_f5p_ERvZhNt0f4OtASL8C8rFije5X4JyL--g6_dwCcfEtA2QIxIy4nt_s5BQBxQ4_UlM95VEu7I_tv1L5WKV4lyMtJXaLIC4_vsnJRGpH_AtK6reswPAZGeUXHCaKjHz_dyUtNjwi_Zs8WMFjBrYaAFKAvbaYtny99gC8lmeM_H9xPsZCWcXEAeMIPFPW_25rQGG4CGOljGkqe0iGNKL7vOsIRisPKGjZargCcGwcjGkqh2sfqjjGbbzf..; isg=BKqqJHgjuEo5gzDwgpzg2chf-xZMGy51Zr0pHDR1z_yyZ2AhHKnJhPvR95P7l6YN',
    },
  }
  const req = https.request(
    'https://www.iconfont.cn/api/project/cdn.json',
    options,
    (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        const result = JSON.parse(data)
        console.log('12', result)
        if (result.code === 200) {
          // 拼接下载文件的url
          iconfontConfig.path = '/t/' + result.data?.js_file + '.js'
          // downloadIconfont()
        }
      })
    },
  )
  req.on('error', (error) => {
    console.error('请求发生错误：', error)
  })
  // 将请求体数据放入请求中
  req.write(postData)
  req.end()
}

const getFile = () => {
  axios({
    method: 'get',
    url: 'https://www.iconfont.cn/api/project/download.zip',
    params: {
      pid: '1171477',
      t: Date.now(),
      ctoken: 'vdmHNEi9kog4XPluHQ2ziIPQ',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie:
        'cna=Uit/HW1FQXMCAXxOmPUQWNE+; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlLc7wBKUayI7v2lorkTHK5_J1R5Htpl7WAOefIZMrIq5lJW1e6TXCn4jy-pzmCLdvjkBWeHkU1FjPS55LuPskPvCIT4AceELcDMYvIk-uLmOg==; ctoken=vdmHNEi9kog4XPluHQ2ziIPQ; u=5527282; u.sig=YbGe71iSdE0L0S4NHdERhkUwsDs78DnTmt9qlbIHGSw; xlly_s=1; tfstk=fKTSZR434pL2WmRfKghVledaxIbBJLgZdW1psBUz9aQ8pJdO3Q8PzBrBdKOOvURFye_Bhp9y4aKyA69wwpsnZ9WddpRp4juZ7QAl-wpIQVuZKOWZ-LZL2_hdD11GUKrzGQAl-SV4pc-vZk6vFNTRJpQAk_5hJ_CRJj_Aa6QLyMU8D-Bc9wBppTEYk_f5p_ERvZhNt0f4OtASL8C8rFije5X4JyL--g6_dwCcfEtA2QIxIy4nt_s5BQBxQ4_UlM95VEu7I_tv1L5WKV4lyMtJXaLIC4_vsnJRGpH_AtK6reswPAZGeUXHCaKjHz_dyUtNjwi_Zs8WMFjBrYaAFKAvbaYtny99gC8lmeM_H9xPsZCWcXEAeMIPFPW_25rQGG4CGOljGkqe0iGNKL7vOsIRisPKGjZargCcGwcjGkqh2sfqjjGbbzf..; isg=BKqqJHgjuEo5gzDwgpzg2chf-xZMGy51Zr0pHDR1z_yyZ2AhHKnJhPvR95P7l6YN',
    },
  }).then((res) => {
    console.log('res', res)
  })
}
getFile()
// 下载文件
const downloadIconfont = () => {
  const params = {
    pid: '1171477',
    ctoken: 'vdmHNEi9kog4XPluHQ2ziIPQ',
  }
  let queryParams = new URLSearchParams(params).toString()
  const url = `https://www.iconfont.cn/api/project/download.zip?${queryParams}`

  // cleanupDownloadedFile()
  // const fileStream = fs.createWriteStream(iconfontConfig.tempFilePath)
  const options = {
    host: iconfontConfig.host,
    path: iconfontConfig.path,
  }
  https
    .get(url, { method: 'GET' }, (response) => {
      console.log('xiazai', response)
      // response.pipe(fileStream)
      // fileStream.on('finish', () => {
      //   fileStream.close()
      //   console.log('Iconfont.js 下载完成')
      //   replaceIconfont()
      // })
    })
    .on('error', (err) => {
      console.error('Iconfont.js 下载失败:', err)
    })
}

// 清除临时文件
const cleanupDownloadedFile = () => {
  if (!fs.existsSync(iconfontConfig.tempFilePath)) return
  fs.unlink(iconfontConfig.tempFilePath, (err) => {
    if (err) {
      console.error('删除临时文件失败:', err)
    } else {
      console.log('删除临时文件成功')
    }
  })
}

// 替换图标
const replaceIconfont = () => {
  fs.copyFile(
    iconfontConfig.tempFilePath,
    iconfontConfig.targetFilePath,
    (err) => {
      if (err) {
        console.error('替换图标库失败:', err)
      } else {
        console.log('替换图标库成功')
      }
      cleanupDownloadedFile()
    },
  )
}

// getIconUrl()
// downloadIconfont()
