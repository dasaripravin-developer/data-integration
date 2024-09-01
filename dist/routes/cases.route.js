"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesRoutes = void 0;
const cases_controller_1 = require("../controllers/cases.controller");
const logger_1 = require("../utils/logger");
class CasesRoutes {
    constructor() {
        this.casesController = new cases_controller_1.CasesController();
    }
    registerRoutes(app) {
        logger_1.logger.info(`routes - cases.route - registerRoutes - `);
        app.get("/cases/by-city", this.casesController.getCasesByCity);
        app.get('/cases/city-wise', this.casesController.getCityWiseCases);
    }
}
exports.CasesRoutes = CasesRoutes;
