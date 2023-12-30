export const authMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Not authorized" })
        }
        next()
    }
}

export const authMiddlewareTwoRoles = (role1, role2) => {
    return (req, res, next) => {
        if ((req.user.role !== role1) && (req.user.role !== role2)) {
            return res.status(403).json({ message: "Not authorized" })
        }
        next()
    }
}