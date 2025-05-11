import { type NextRequest } from 'next/server'

export function GET(request: NextRequest){
  console.log(request)
  return new Response('hello')
}
