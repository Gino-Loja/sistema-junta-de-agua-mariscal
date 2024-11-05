import {
    parseAsFloat,
    createSearchParamsCache,
    parseAsString
  } from 'nuqs/server'
   
  export const coordinatesParsers = {
    year: parseAsString.withDefault(''),
    //lng: parseAsFloat.withDefault(5.72)
  }
  export const coordinatesCache = createSearchParamsCache(coordinatesParsers)
   