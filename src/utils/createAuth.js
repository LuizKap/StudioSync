import jwt from 'jsonwebtoken'

function createAuthToken(userId) {
    const payload = { userId: userId }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export { createAuthToken }