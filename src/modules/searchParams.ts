import {
  parseAsString,
  createSearchParamsCache
} from  'nuqs/server'

export const coordinatesParsers = {
  query: parseAsString.withDefault(''),
  page: parseAsString.withDefault('1'),
  per_page: parseAsString.withDefault('10'),
  date: parseAsString.withDefault(new Date().toDateString()),  

}
export const coordinatesCache = createSearchParamsCache(coordinatesParsers)