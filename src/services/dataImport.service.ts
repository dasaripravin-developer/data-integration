import { CasesModel } from "../models/cases.model";
import { GoogleSheetReader } from "../utils/googleSheetReader";
import { logger } from "../utils/logger";

export class DataImportService {
     private googleSheetReader: GoogleSheetReader;
     constructor() {
          this.googleSheetReader = new GoogleSheetReader();
     }
     async importData(url: string) {
          try {
               logger.info(`services - dataImportService - importData - url - ${url}`);
               const sheetData = await this.googleSheetReader.readInChunk(url);
               logger.info(`services - dataImportService - importData - url - ${url} - data lenght - ${sheetData.lenght}`);
               const cases = sheetData.map((row: any) => ({
                    bankName: row.bankName,
                    propertyName: row.propertyName,
                    city: row.city,
                    borrowerName: row.borrowerName,
                    createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
               }));

               await CasesModel.insertMany(cases);
               logger.info(`services - dataImportService - importData - url - ${url} - ${sheetData.lenght} recored inserted successfully`);
          } catch (error) {
               logger.info(`services - dataImportService - importData - url - ${url} - Exception - ${error}`);
               logger.error(`services - dataImportService - importData - url - ${url} - Exception - ${error}`);
          }
     }
}
