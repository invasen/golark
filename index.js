const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();
const fortune = require("./lib/fortune");
const handlers = require("./lib/handlers");
const path = require("path");

app.engine(
	"hbs",
	expressHandlebars({
		defaultLayout: "main",
		extname: ".hbs",
	})
);

app.set("view engine", "hbs");

const port = process.env.PORT || 3333;

app.use(express.static(path.resolve("public")));

// app.get("/", (req, res) => {
// 	res.render("home");
// });

app.get("/", handlers.home);

// app.get("/about", (req, res) => {
// 	res.render("about", { fortune: fortune.getFortune() });
// });

app.get("/about", handlers.about);

// app.use((req, res) => {
// 	res.type("text/plain");
// 	res.status(404);
// 	res.render("404");
// });

app.get("/headers", (req, res) => {
	res.type("text/plain");
	const headers = Object.entries(req.headers).map(
		([key, value]) => `${key}: ${value}`
	);
	res.send(headers.join("\n"));
});

app.use(handlers.notFound);

// app.use((err, req, res, next) => {
// 	console.error(err.message);
// 	res.type("text/plain");
// 	res.status(500);
// 	res.render("500");
// });

app.use(handlers.serverError);

app.listen(port, () =>
	console.log(
		`Express started in ` +
			`${app.get("env")} mode at http://localhost:${port}` +
			`; press Ctrl-C to terminate.`
	)
);
