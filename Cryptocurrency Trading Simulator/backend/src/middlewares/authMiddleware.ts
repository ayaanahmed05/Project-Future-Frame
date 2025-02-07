import jwt from 'jsonwebtoken';

const authMiddleware = (roles: string[] = []) => {
    return (req: any, res: any, next: any) => {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check for token in cookies or headers

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string; role: string }; // Verify token

            if (roles.length && !roles.includes(decoded.role)) { // Check if user has required permissions
                return res.status(403).json({ error: "Forbidden: Insufficient permissions" }); // 403 Forbidden
            }

            req.user = decoded; // Attach user object to request
            next();
        } catch (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }

}

export default authMiddleware;
