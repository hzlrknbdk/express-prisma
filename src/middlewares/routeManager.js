import profileRoutes from "../routes/profileRoutes.js";
import commentRoutes from "../routes/commentRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";
import postRoutes from "../routes/postRoutes.js";
import likeRoutes from "../routes/likeRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import eventRoutes from "../routes/eventRoutes.js";

export const routeManager = (app, authenticateToken) => {
  app.use("/api/login", authRoutes);
  app.use("/api/users", userRoutes);

  const protectedRoutes = [
    { path: "/api/post", route: postRoutes },
    { path: "/api/like", route: likeRoutes },
    { path: "/api/profile", route: profileRoutes },
    { path: "/api/comment", route: commentRoutes },
    { path: "/api/category", route: categoryRoutes },
    { path: "/api/event", route: eventRoutes },
  ];

  protectedRoutes.forEach(({ path, route }) => {
    app.use(path, authenticateToken, route);
  });
};
