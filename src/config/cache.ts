import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  config: {
    redis: RedisOptions
  },
  driver: string
}

export default {
  config: {
    redis: {
      host: 'rediss://red-cdqsueun6mpqj2clrgr0:DykG83lqTn9ch5AOGY3TM2LxJXjrNQDK@oregon-redis.render.com:6379',
      port: 6379,
      password: undefined
    }
  },
  driver: 'redis'
} as ICacheConfig
