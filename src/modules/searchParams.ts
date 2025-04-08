import { ITEMS_PER_PAGE, TIME_ZONE } from '@/model/Definitions'
import { now } from '@internationalized/date'
import {
  parseAsString,
  parseAsInteger,
  createSearchParamsCache,
} from 'nuqs/server'

export const coordinatesParsers = {
  query: parseAsString.withDefault(''),
  page: parseAsString.withDefault('1'),
  per_page: parseAsString.withDefault(ITEMS_PER_PAGE.toString()),
  date: parseAsString.withDefault(''),
  sector: parseAsString.withDefault(''),
  year: parseAsInteger.withDefault(now(TIME_ZONE).year),
  month: parseAsInteger,
  from: parseAsString.withDefault(''),
  to: parseAsString.withDefault(''),  
  status: parseAsString.withDefault(''),
  type: parseAsString.withDefault(''),
  wm: parseAsInteger,
  yr: parseAsInteger,
}



export const coordinatesCache = createSearchParamsCache(coordinatesParsers)