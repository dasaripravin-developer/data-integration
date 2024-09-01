import { Request, Response } from "express";
import { DataAggregationService } from "../services/dataAggregation.service";
import { logger } from "../utils/logger";

export class CasesController {
     constructor() {
          logger.info(`controllers - cases.controller -  data aggregation service object created`);
     }

     async getCasesByCity(req: Request, res: Response) {
          try {
               logger.info(`controllers - cases.controller - getCasesByCity - ${JSON.stringify(req.query)}`);
               const { city, startDate, endDate }: any = req.query;
               console.log("this this = >", this);
               const cases = await new DataAggregationService().getCasesByCity(
                    city,
                    startDate ? new Date(startDate) : undefined,
                    endDate ? new Date(endDate) : undefined
               );
               logger.info(`controllers - cases.controller - getCasesByCity - response - ${cases}`);
               res.json({ cases });
          } catch (error) {
               logger.info(`controllers - cases.controller - getCasesByCity - Exception - ${error}`);
               logger.error(`controllers - cases.controller - getCasesByCity - Exception - ${error}`);
               res.status(500).json({ error: "Failed to retrieve cases" });
          }
     }

     async getCityWiseCases(request: Request, response: Response) {
          try {
               logger.info(`controllers - cases.controller - getCityWiseCases - `);
               const res = await new DataAggregationService().getCityWiseCases();
               logger.info(`controllers - cases.controller - getCityWiseCases - response - ${res}`);
               response.json(res);
          } catch (err) {
               logger.info(`controllers - cases.controller - getCityWiseCases - exception - ${err}`);
               logger.error(`controllers - cases.controller - getCityWiseCases - exception - ${err}`);
               response.status(500).json({ error: "Failed to get city wise cases" });
          }
     }
}
