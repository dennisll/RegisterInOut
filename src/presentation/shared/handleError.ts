import { Response } from "express";
import { CustomError } from "../../domain";


export const handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ error: error.message });
          return;
        }
        // usar un logger como winston
        //console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      };