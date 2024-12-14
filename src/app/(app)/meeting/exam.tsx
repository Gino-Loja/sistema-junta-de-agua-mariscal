import { coordinatesCache } from "@/modules/searchParams"

 
export function Server() {
  const { date, query, page, per_page } = coordinatesCache.all()
  console.log(date, query, page, per_page)
  return (
    <span>
      Server: {date} - {query} - {page} - {per_page}
    </span>
  )
  // or access keys individually:

 
}