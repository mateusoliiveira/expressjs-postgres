import axios from 'axios'
import { IShowAvailableScheduleLink } from '../domain/models/IShowAvailableScheduleLink'


export default class FetchRaceService {
  public async execute({ link }: IShowAvailableScheduleLink): Promise<any> {
    try {
      const response = await axios.get(`https://www.tomadadetempo.com.br/${link}`)
      return response.data
    } catch (error) {
      return error;
    }
  }
}
