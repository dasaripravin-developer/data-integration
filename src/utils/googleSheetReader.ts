import { google } from "googleapis";
import credentials from "../../credential/credential.json"; 
// Git is not allowing to commit security kind of content, while pushing credentia.json file, it throwing error. therefore please add credential.json file which you will get from google cloud console in service account section.
import { logger } from "../utils/logger";
export class GoogleSheetReader {
     private scopes: string[];
     private chunkSize: number = 5;
     private auth: any;
     constructor() {
          this.scopes = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
          this.auth = new google.auth.GoogleAuth({
               scopes: this.scopes,
               credentials: credentials,
          });
     }

     async readInChunk(url: string): Promise<any> {
          let i = 0;
          try {
               const resultArr = [];
               const sheets = google.sheets({ version: "v4", auth: this.auth });

               const readChunk = async (start: number, end: number) => {
                    logger.info(`utils - googleSheetReader - readInChunk - readChunk - start - ${start} - end - ${end}`);
                    const response = await sheets.spreadsheets.values.get({
                         spreadsheetId: url.split("/d/")[1],
                         range: `Sheet1!${start}:${end}`,
                    });
                    return response.data.values || [];
               };

               const formatData = async (rows: any, headers: any) =>
                    rows.map((row: any) => {
                         const obj: any = {};
                         headers.forEach((header: string, index: number) => {
                              obj[header] = row[index];
                         });
                         return obj;
                    });

               let headers = [];
               while (true) {
                    let rows = await readChunk(this.chunkSize * i + 1, this.chunkSize * (i + 1));
                    if (rows.length <= 1 && i === 0) {
                         logger.info(`utils - googleSheetReader - readInChunk - file is empty - url - ${url}`);
                         logger.error(`utils - googleSheetReader - readInChunk - file is empty - url - ${url}`);
                         break;
                    }
                    if (i == 0) {
                         headers = rows[0];
                         rows = rows.splice(1);
                    }
                    logger.info(`utils - googleSheetReader - readInChunk - batch - ${i + 1} - data lenght - ${rows.length}`);
                    resultArr.push(...(await formatData(rows, headers)));
                    if ((rows.length < this.chunkSize - 1 && i == 0) || (rows.length < this.chunkSize && i != 0)) break;
                    i++;
               }
               return resultArr;
          } catch (err) {
               logger.info(`utils - googleSheetReader - readInChunk - Exception - while reading data - batch - ${i + 1} - Error - ${err}`);
               logger.error(`utils - googleSheetReader - readInChunk - Exception - while reading data - batch - ${i + 1} - Error - ${err}`);
          }
     }
}
