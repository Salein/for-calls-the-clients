import React, { useEffect, useState } from "react"
import { createWorker } from "tesseract.js"
import "./App.css"

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [textResult, setTextResult] = useState("")

  const worker = createWorker()
  
// ниже багло
  useEffect(() => {
    const convertImageToText = async () => {
      await worker.load()
      await worker.loadLanguage("ru")
      await worker.initialize("ru")
      const { data } = await worker.recognize(selectedImage)
      console.log(data.text)
    }
  }, [selectedImage])

  const handleChangeImage = (e) => {
    setSelectedImage(e.target.files[0])
  }

  return (
    <div className="App">
      <input
        type="file"
        id="upload"
        accept="image/*"
        onChange={handleChangeImage}
      />

      <button type="button" id="start">
        Начать обработку
      </button>

      <div id="log">
        {selectedImage && (
          <div>
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
        {textResult && <div>{textResult}</div>}
      </div>
    </div>
  )
}

export default App
