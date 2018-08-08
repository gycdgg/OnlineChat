import Router from 'koa-router'
import { normalizeResponse } from '../middleware'
import userController from './user'

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


export default router