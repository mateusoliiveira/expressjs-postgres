export default class HttpResponse<T> {
    constructor(
      public statusCode: number,
      public body: {
        message: string
        http: string
        data?: T
      }
    ) { }
  }
  