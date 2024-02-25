import { Response } from "express"

const errorHandler = (res: Response,error: any) => {
	if (error instanceof Error) {
		return res.status(400).json({ error: true,message: error.message });
	} else {
		return res.status(500).json({ error: true,message: "Server error" });
	}
}

export default errorHandler