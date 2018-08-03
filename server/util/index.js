import jwt from 'jsonwebtoken'

const config = {
  secret: 'edguan',
  timeout: 1200000
}

/**
 * Create token
 * @param {Object} user 
 * @return {Object} token and expire time in millisecond 
 */
const signToken = (user) => {
  const token = jwt.sign({
    user_id: user.id
  }, config.secret, {
    expiresIn: config.timeout
  })
  return {
    token,
    expiresIn: config.timeout
  }
}

/**
 * Check and get token if exist
 * @param {Object} ctx 
 * @return {String} user ide
 */
const verifyToken = async (ctx) => {
  const user_id = await ctx.cookies.get('user_id')
  if (user_id) {
    return jwt.verify(user_id, config.secret)
  }
}

export {
  signToken,
  verifyToken 
}