import { normalizeResponse } from '../middleware'
import userController from './user'
import friendsController from './friend'
import messageController from './message'
import Router from 'koa-router'
import path from 'path'
import fs from 'fs'
const router = Router()
/**
 * check login status and get user info
 * get: check session and user login
 * post:  user login
 * put: update  user
 * delete: log out
 */
router.get('/api/session', normalizeResponse(userController._get))
router.post('/api/session', userController.create)
router.put('/api/session', normalizeResponse(userController.update))
router.delete('/api/session', normalizeResponse(userController._delete))

router.get('/api/friends/:id?', normalizeResponse(friendsController._get))
router.post('/api/friends', friendsController.create)
router.put('/api/friends', normalizeResponse(friendsController.update))
router.delete('/api/friends', normalizeResponse(friendsController._delete))

router.get('/api/users', normalizeResponse(userController.find))

router.get('/api/messages', normalizeResponse(messageController._get))

router.post('/api/uploads', async (ctx) => {
  try{
    const file = ctx.request.files[0]
    let hash = randomChar(9)
    let filename = file.originalFilename || path.basename(file.path)
    let targetPath = `./static/uploads/${hash}${filename}`
    await fs.createReadStream(file.path).pipe(fs.createWriteStream(targetPath))
    console.timeEnd('server')
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>end')
    ctx.body = {
      url: `${ctx.headers.origin}/static/uploads/${hash}${filename}`
    }

  }catch(error) {
    console.log('error', error)
  }
})

const randomChar = (l) =>  {
  let x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let tmp = ''
  let timestamp = new Date().getTime()
  for(let  i = 0;i <  l;i++)  {
    tmp  +=  x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return  timestamp + tmp
}
export default router