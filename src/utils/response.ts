import { Response } from "express"

const response = (res: Response,statusCode: number = 500,data: any) => {
	return res.status(statusCode).json({
		error: false,
		data,
	})
}

export default response