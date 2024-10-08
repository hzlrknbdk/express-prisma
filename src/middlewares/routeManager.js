import profileRoutes from "../routes/profileRoutes.js";
import commentRoutes from "../routes/commentRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import postRoutes from "../routes/postRoutes.js";
import likeRoutes from "../routes/likeRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";

export const routeManager = (app, authenticateToken) => {
  app.use("/api/login", authRoutes);
  app.use("/api/users", userRoutes);

  const protectedRoutes = [
    { path: "/api/post", route: postRoutes },
    { path: "/api/like", route: likeRoutes },
    { path: "/api/profile", route: profileRoutes },
    { path: "/api/comment", route: commentRoutes },
    { path: "/api/category", route: categoryRoutes },
  ];

  protectedRoutes.forEach(({ path, route }) => {
    app.use(path, authenticateToken, route);
  });
};
