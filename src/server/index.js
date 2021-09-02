import express from "express";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import servicesLoader from "./services";
import db from "./database";

const utils = {
	db,
};
const services = servicesLoader(utils)
const serviceNames = Object.keys(services);

const root = path.join(__dirname, "../../");

const app = express();
console.log(process.env.NODE_ENV);

// app.use(helmet());
// app.use(
// 	helmet.contentSecurityPolicy({
// 		directives: {
// 			defaultSrc: ["'self'"],
// 			scriptSrc: ["'self'", "'unsafe-inline'"],
// 			styleSrc: ["'self'", "'unsafe-inline'"],
// 			imgSrc: ["'self'", "data:", "*.amazonaws.com"],
// 		},
// 	}),
// );
// app.use(helmet.referrerPolicy({ policy: "same-origin" }));

serviceNames.forEach(async (name) => {
	if (name == "graphql") {
		await services[name].start();
		services[name].applyMiddleware({ app });
	} else {
		app.use(`/${name}`, services[name]);
	}
});

app.use(compression());
app.use(cors());
app.use("/", express.static(path.join(root, "dist/client")));
app.use("/uploads", express.static(path.join(root, "uploads")));
app.get("/", (req, res) => {
	res.status(200).sendFile(path.join(root, "dist/client/index.html"));
});
app.listen(8000, () => console.log("Listeng to port 8000"));
