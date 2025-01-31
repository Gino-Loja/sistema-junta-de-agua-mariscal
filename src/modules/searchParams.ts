import {
  parseAsString,
  parseAsInteger,
  createSearchParamsCache,
  parseAsNumberLiteral
} from  'nuqs/server'

export const coordinatesParsers = {
  query: parseAsString.withDefault(''),
  page: parseAsString.withDefault('1'),
  per_page: parseAsString.withDefault('10'),
  date: parseAsString.withDefault(new Date().toDateString()),  
  sector: parseAsString.withDefault(''),

}
export const coordinatesCache = createSearchParamsCache(coordinatesParsers)