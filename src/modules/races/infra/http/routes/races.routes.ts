import { Router } from 'express';
import RacesController from '../controllers/RacesController';

const racesRouter = Router();
const racesController = new RacesController();

racesRouter
  .get(
    '/schedule',
    racesController
      .index);

racesRouter
  .get(
    '/schedule/show:link?',
    racesController
      .show);

export default racesRouter;
