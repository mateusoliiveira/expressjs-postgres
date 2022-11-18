import { JSDOM } from 'jsdom';
import pg from "pg";
import FetchRaceService from "./FetchRaceService";
import { IShowAvailableScheduleLink } from "../domain/models/IShowAvailableScheduleLink";
import RedisCache from '../../../shared/RedisCache';

export default class ShowAvailableScheduleService {
  public async execute({ link }: IShowAvailableScheduleLink): Promise<any> {
    return link
    const pool = new pg.Pool()
    const { rows } = await pool.query(`
    SELECT 
      id
    FROM 
      races 
    WHERE 
      weekend_start = ${''}
    AND
      weekend_end = ${''}
    ;
    `);
    const fetch = new FetchRaceService()
    try {
      const getHTML = await fetch.execute({ link })
      const dom = new JSDOM(getHTML).window.document
      const heading = dom.querySelector('.td-post-content')?.children
      let weekDaysContentREDIS: {
        startDate: string,
        friday: { name?: string, time?: string }[],
        saturday: { name?: string, time?: string }[],
        sunday: { name?: string, time?: string }[]
      } = {
        startDate: '',
        friday: [],
        saturday: [],
        sunday: []
      }
      const lengths = {
        fridayLength: heading!.item(8)!.children.length,
        saturdayLength: heading!.item(10)!.children.length,
        sundayLength: heading!.item(12)!.children.length,
      }
      let initial = 0
      for (initial; initial < lengths.fridayLength; initial++) {
        let splittedNameDate = heading?.
          item(8)?.children.
          item(initial)?.
          querySelectorAll('strong')[0].innerHTML.
          split(' – ')

        if (splittedNameDate) {
          weekDaysContentREDIS.friday = [
            ...weekDaysContentREDIS.friday, {
              name: splittedNameDate[1],
              time: splittedNameDate[0]
            }]
        }
      }
      initial = 0
      for (initial; initial < lengths.saturdayLength; initial++) {
        let splittedNameDate = heading?.
          item(10)?.children.
          item(initial)?.
          querySelectorAll('strong')[0].innerHTML.
          split(' – ')

        if (splittedNameDate) {
          weekDaysContentREDIS.saturday = [
            ...weekDaysContentREDIS.saturday, {
              name: splittedNameDate[1],
              time: splittedNameDate[0]
            }]
        }

      }
      initial = 0
      for (initial; initial < lengths.sundayLength; initial++) {
        let splittedNameDate = heading?.
          item(12)?.children.
          item(initial)?.
          querySelectorAll('strong')[0].innerHTML.
          split(' – ')

        if (splittedNameDate) {
          weekDaysContentREDIS.sunday = [
            ...weekDaysContentREDIS.sunday, {
              name: splittedNameDate[1],
              time: splittedNameDate[0]
            }]
        }
      }
      return weekDaysContentREDIS
    } catch (error) {
      return { error: 'Não encontrado' }
    }
  }
}
