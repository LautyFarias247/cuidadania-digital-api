import express,{ NextFunction,Request,Response } from 'express'
import bodyParser from 'body-parser'
import { PORT } from './lib/env';
import morgan from 'morgan'

import { clientsRouter,modelsRouter,productsRouter,salesRouter } from './routes'

const app = express()

const configureBodyParser = () => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(morgan("dev"))
}

const configureCrossOriginModule = () => {
	app.use((req,res,next) => {
		res.setHeader('Access-Control-Allow-Origin',"*");
		res.setHeader('Access-Control-Allow-Credentials',"true");
		res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
		return next();
	});
};

const configureRoutes = () => {
	app.use("/products",productsRouter)
	app.use("/clients",clientsRouter)
	app.use("/sales",salesRouter)
	app.use("/models",modelsRouter)
	app.use('*',(req,res) => {
		res.status(404).send('Not found');
	});
	app.use((err: any,req: Request,res: Response,next: NextFunction) => {
		console.error(err.stack);
		res.status(500).send('Error interno del servidor');
	});
	app.use(express.static("public"))
}


const configureWebServer = () => {
	app.listen(PORT,() => {
		console.log("SERVER ON PORT ",PORT)
	})
}

const createServer = async () => {
	try {
		configureBodyParser();
		configureCrossOriginModule();
		configureRoutes();
		configureWebServer();
	} catch (error) {

	}


	return app;
};

export default createServer