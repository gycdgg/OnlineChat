import Router from 'koa-router'
import { normalizeResponse } from '../middleware'
import userController from './user'
import friendsController from './friend'
import fs from 'fs'
import path from 'path'
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


// let readFileThunk = function (src) {
//   console.log(222)
//   return new Promise(function (resolve, reject) {
//     fs.readFile(src, { 'encoding': 'utf8' }, function (err, data) {
//       if(err) return reject(err)
//       resolve(data)
//     })
//   })
// }
// router.get('/', async (ctx, next) => {
//   console.log(1111)
//   ctx.body = await readFileThunk(path.resolve(__dirname, '../dist/index.html'))
// })
export default router