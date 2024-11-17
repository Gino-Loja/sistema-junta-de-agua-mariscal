import {
    parseAsFloat,
    createSearchParamsCache,
    parseAsString
} from 'nuqs/server'

export const coordinatesParsers = {
    id: parseAsString.withDefault(''),
}
export const coordinatesCache = createSearchParamsCache(coordinatesParsers)