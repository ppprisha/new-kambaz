const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const moduleObj = {
    id: 1,
    name: "Module 1",
    description: "Intro to Node",
    course: "Full Stack Development",
};

export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => res.json(assignment));
    app.get("/lab5/assignment/title", (req, res) => res.json(assignment.title));
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        assignment.title = req.params.newTitle;
        res.json(assignment);
    });
    app.get("/lab5/assignment/score/:score", (req, res) => {
        assignment.score = parseInt(req.params.score);
        res.json(assignment);
    });
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        assignment.completed = req.params.completed === "true";
        res.json(assignment);
    });

    app.get("/lab5/module", (req, res) => res.json(moduleObj));
    app.get("/lab5/module/name", (req, res) => res.json(moduleObj.name));
    app.get("/lab5/module/name/:newName", (req, res) => {
        moduleObj.name = req.params.newName;
        res.json(moduleObj);
    });
    app.get("/lab5/module/description/:desc", (req, res) => {
        moduleObj.description = req.params.desc;
        res.json(moduleObj);
    });
}