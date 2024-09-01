import { CasesModel } from "../models/cases.model";
import { logger } from "../utils/logger";

export class DataAggregationService {
     async getCasesByCity(city: string, startDate?: Date | undefined, endDate?: Date | undefined): Promise<any> {
          try {
               logger.info(`services - dataAggregationService - getCasesByCity - city - ${city}  - startdate - ${startDate} - enddate - ${endDate}`);
               const query: any = { city };
               if (startDate) {
                    query.createdAt = { $gte: startDate };
               }

               if (endDate) {
                    query.createdAt ? (query.createdAt["$lte"] = endDate) : (query.createdAt = { $lte: endDate });
               }
               logger.info(`services - dataAggregationService - getCasesByCity - query - ${JSON.stringify(query)}`);
               const cases = (await CasesModel.find(query)).length;
               logger.info(`services - dataAggregationService - getCasesByCity - response - ${cases}`);

               return cases;
          } catch (err) {
               logger.info(`services - dataAggregationService - getCasesByCity - Exception - ${err}`);
               logger.error(`services - dataAggregationService - getCasesByCity - Exception - ${err}`);
          }
     }

     async getCityWiseCases(): Promise<any> {
          try {
               logger.info(`services - dataAggregationService - getCityWiseCases -`);
               const result = await CasesModel.aggregate([
                    {
                         $group: {
                              _id: "$city",
                              count: { $sum: 1 },
                         },
                    },
               ]);
               logger.info(`services - dataAggregationService - getCityWiseCases - result - ${JSON.stringify(result)}`);
               return result;
          } catch (err) {
               logger.info(`services - dataAggregationService - getCityWiseCases - Exception - ${err}`);
               logger.error(`services - dataAggregationService - getCityWiseCases - Exception - ${err}`);
          }
     }
}
