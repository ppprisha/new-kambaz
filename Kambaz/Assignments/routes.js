import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments", async (req, res) => {
    const all = await dao.findAllAssignments();
    res.json(all);
  });

  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });

  app.post("/api/assignments", async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.json(assignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const updated = await dao.updateAssignment(req.params.aid, req.body);
    res.json(updated);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    await dao.deleteAssignment(req.params.aid);
    res.sendStatus(204);
  });
}