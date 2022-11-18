import { JSDOM } from 'jsdom';
import RedisCache from '../../../shared/RedisCache';
import FetchScheduleService from "./FetchScheduleService";

export default class ListAvailableScheduleService {
  public async execute(): Promise<any> {
    // const redisCache = new RedisCache();
    // let schedulesLinksREDIS = await redisCache.recover<any[]>(`schedules-links-LIST`)
    // if (!schedulesLinksREDIS) {
    const fetch = new FetchScheduleService()
    try {
      const getHTML = await fetch.execute()
      const dom = new JSDOM(getHTML).window.document
      const heading = dom.querySelector('.td-ss-main-content')?.children
      let schedulesLinksFETCH: any[] = []
      let initial = 0
      for (initial; initial < heading!.length - 1; initial++) {
        let getLink = heading?.
          item(initial)?.children.
          item(0)?.
          querySelector('h3')?.
          querySelector('a')?.href

        if (getLink) {
          schedulesLinksFETCH = [
            ...schedulesLinksFETCH, {
              link: getLink,
            }]
        }
      }
      console.log('fetch')
      // await redisCache.save(`schedules-links-LIST`, schedulesLinksFETCH)
      return schedulesLinksFETCH
    } catch (error) {
      return { error: 'Não encontrado' }
    }
    // console.log('redis')
    // return schedulesLinksREDIS
  }

}
