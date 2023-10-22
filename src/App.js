import React, { useState } from "react"
import Tesseract from "tesseract.js"
import "./App.css"

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [progress, setProgress] = useState(0)

  window.onerror = function (error) {
    alert('Ой, вы забыли выбрать файл')
  }

  const handleClick = () => {
    setIsLoading(true)
    Tesseract.recognize(image, "rus", {
      logger: (m) => {
        console.log(m)
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100))
        }
      },
    }).then(({ data: { text } }) => {
      setText(text)
      setIsLoading(false)
    })
  }

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && (
            <h1 className="mt-4 mb-5 pb-3">Конверт картинки в текст</h1>
          )}

          {!isLoading && !text && (
            <>
              <input
                type="file"
                className="form-control mb-2 pb-2"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
              />
              <input
                type="button"
                className="form-control btn btn-primary mt-4"
                value="Начать обработку"
                onClick={handleClick}
              />
            </>
          )}

          {isLoading && (
            <>
              <p className="text-center mt-4 mb-4">
                Конвертирование - {progress}%
              </p>
            </>
          )}

          {!isLoading && text && (
            <textarea
              className="form-control"
              rows="15"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
