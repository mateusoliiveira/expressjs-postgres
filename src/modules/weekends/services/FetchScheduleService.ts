import axios from 'axios'

export default class FetchScheduleService {
  public async execute(): Promise<any> {
    try {
      const response = await axios.get(
        `https://www.tomadadetempo.com.br/category/programacao-da-tv/`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
}
