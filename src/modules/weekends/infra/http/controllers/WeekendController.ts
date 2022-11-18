import ListAvailableScheduleService from "../../../../../modules/races/services/ListAvailableScheduleService";
import { NextFunction, Request, Response } from "express";
import ShowAvailableScheduleService from "../../../../../modules/races/services/ShowAvailableScheduleService";

export default class WeekendController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<any> {
    const serviceSchedule = new ListAvailableScheduleService()
    const result = await serviceSchedule.execute()
    return response.send(result)
  }
}
