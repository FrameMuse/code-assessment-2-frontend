import "./CookiesNotice.scss"

import { Button } from "@mui/material"
import { useRef, useState } from "react"
import { classWithModifiers } from "utils/common"

function CookiesNotice() {
  const cookiesRef = useRef(localStorage.getItem("cookies"))
  const [cookies, setCookies] = useState("")
  function onClick() {
    setCookies("accept")
    localStorage.setItem("cookies", "accept")
  }
  if (process.env.NODE_ENV === "production") {
    if (cookiesRef.current === "accept") {
      return null
    }
  }
  return (
    <div className={classWithModifiers("cookies-notice", cookies === "accept" && "accept")}>
      <div className="cookies-notice__container">
        <p className="cookies-notice__text">
          This site uses cookies. By continuing to use our site, you agree to our use of these technologies.
        </p>
        <Button variant="contained" onClick={onClick}>Ок</Button>
      </div>
    </div>
  )
}

export default CookiesNotice
