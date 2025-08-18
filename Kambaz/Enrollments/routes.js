import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    if (!user || !course) {
      res.status(400).json({ message: "Missing user or course" });
      return;
    }
    const newEnrollment = dao.enrollUserInCourse(user, course);
    res.json(newEnrollment);
  });

  app.delete("/api/enrollments/user/:uid/course/:cid", (req, res) => {
    const { uid, cid } = req.params;
    const removed = dao.unenrollUserFromCourse(uid, cid);
    if (removed) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Enrollment not found" });
    }
  });

  app.get("/api/enrollments", (req, res) => {
    const allEnrollments = dao.getAllEnrollments();
    res.json(allEnrollments);
  });
}