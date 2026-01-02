export const isSchoolAdmin = (req, res, next) => {
  if (!req.user || req.user.role.toLowerCase() !== "schooladmin")
     {
    return res.status(403).json({ error: "school admin only" });
  }
  next();
};
