import React, { useState } from "react"
import { createWorker } from "tesseract.js"
import "./App.css"

const App = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className="mt-5 mb-4">Convert Image To Text</h1>}

          {!isLoading && !text && (
            <>
              <input type="file" className="form-control" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
              <input type="button" className="form-control btn btn-primary mt-4" />
            </>
          ) }
        </div>
      </div>
    </div>
  )
}

export default App
