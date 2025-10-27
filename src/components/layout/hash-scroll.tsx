import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function HashScroll() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      return
    }

    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [hash])

  return null
}
