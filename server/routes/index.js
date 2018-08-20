import { normalizeResponse } from '../middleware'
import userController from './user'
import friendsController from './friend'
import messageController from './message'
import Router from 'koa-router'
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

export default router