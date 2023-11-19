import React, { useState } from "react"
import Tesseract from "tesseract.js"
import "./App.css"

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState("")
  const [image, setImage] = useState("")
  const [progress, setProgress] = useState(0)
  const [sentence, setSentence] = useState("")
  const [toggle, setToggle] = useState(false)

  window.onerror = function (error) {
    alert(
      "Ой, кажется вы забыли выбрать файл! \n Перезапустите приложение пожалуйста!",
    )
  }

  const handleClick = () => {
    setIsLoading(true)
    Tesseract.recognize(image, "rus", {
      logger: (m) => {
        console.log(m)
        setSentence(m.status)
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100))
        }
      },
    }).then(({ data: { text } }) => {
      console.log({ data: { text } })
      setText(text)
      setIsLoading(false)
    })
  }

  const handleReamove = () => {
    setText('')
    setToggle(false)
  }

  const handleInput = () => {
      setToggle(!toggle)
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
              <h5>{sentence}</h5>
            </>
          )}

          {!isLoading && text && (
            <input
            onClick={handleInput}
              type="button"
              className="form-control btn btn-primary color='info'"
              rows="10"
              value={text}
            ></input>
          )}
          {toggle && (<div>
              <button type="phone" className="mt-1 mb-2 pb-1 btn-primary color='success"><a href="tel:80293100614">Позвонить</a></button>
              <button onClick={handleReamove} type="button" className="mt-1 mb-2 pb-1 color='success">Удалить</button>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
