import ListAvailableScheduleService from "../../../../../modules/races/services/ListAvailableScheduleService";
import { NextFunction, Request, Response } from "express";
import ShowAvailableScheduleService from "../../../../../modules/races/services/ShowAvailableScheduleService";

export default class RacesController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<any> {
    const serviceSchedule = new ListAvailableScheduleService()
    const result = await serviceSchedule.execute()
    return response.send(result)
  }
  public async show(request: Request, response: Response, next: NextFunction): Promise<any> {
    const serviceScheduleRace = new ShowAvailableScheduleService()
    const dataset = request.query['link'];
    if (!dataset) {
      response.status(404).json({ error: 'Dataset not found' });
      return;
    }
    if (typeof dataset !== "string") {
      response.status(500).json({ error: 'Invalid dataset' });
      return;
    }
    console.log({ link: dataset })
    const result = await serviceScheduleRace.execute({ link: dataset })
    return response.send(result)
  }
}
