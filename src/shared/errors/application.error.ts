
export type ApplicationErrorConfig<T> = {
    log?: string
    data?: T
  }
  
  export const DEFAULT_APPLICATION_ERROR_CONFIG: ApplicationErrorConfig<void> = {
    log: 'Unexpected error',
  }
  
  export class ApplicationError<T> extends Error {
    statusCode: any
    constructor(
      public config: ApplicationErrorConfig<T>
    ) {
      super(config.log || DEFAULT_APPLICATION_ERROR_CONFIG.log)
    }
  }
  