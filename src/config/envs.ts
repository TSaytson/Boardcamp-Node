import dotenv from 'dotenv'

export function loadEnv(){
  const path = 
  process.env.NODE_ENV === 'test' ?
  '.env.test'
  : process.env.NODE_ENV === 'development' ?
  '.env.development'
  : '.env'

  dotenv.config({path})
}