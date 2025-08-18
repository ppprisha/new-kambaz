export default function QueryParameters(app) {
    app.get("/lab5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        const x = parseInt(a);
        const y = parseInt(b);

        let result;
        switch (operation) {
            case "add":
                result = x + y;
                break;
            case "subtract":
                result = x - y;
                break;
            case "multiply":
                result = x * y;
                break;
            case "divide":
                result = y !== 0 ? x / y : "Division by zero error";
                break;
            default:
                result = "Invalid operation";
        }

        res.send(result.toString());
    });
}