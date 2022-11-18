import { Router } from 'express';
import racesRouter from '../../../../../src/modules/races/infra/http/routes/races.routes';

const routes = Router();
routes.use('/races', racesRouter);

export default routes;
