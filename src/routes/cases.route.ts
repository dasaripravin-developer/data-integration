import { CasesController } from "../controllers/cases.controller";
import { logger } from "../utils/logger";

export class CasesRoutes {
     private casesController: CasesController;

     constructor() {
          this.casesController = new CasesController();
     }

     registerRoutes(app: any) {
          logger.info(`routes - cases.route - registerRoutes - `);
          app.get("/cases/by-city", this.casesController.getCasesByCity);
          app.get('/cases/city-wise', this.casesController.getCityWiseCases)
     }
}
