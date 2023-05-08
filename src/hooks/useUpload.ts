import React from 'react'

    // fetch('/upload', {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: files[0],
    //   method: "post"
    // })

interface UseUpload {
  options?: ShowOpenFilePicker
  elOptions?: FileInput
}

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showOpenFilePicker
*/
interface ShowOpenFilePicker {
  multiple?: boolean;
  excludeAceptAllOption?: boolean;
  types?: { description: unknown, accept: unknown }[]
}

interface FileInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{}

// isNew 是否使用新版api showOpenFilePicker
const useUpload = (isNew = false, props: UseUpload) => {
  const ref = React.useRef(null)
  const { options = {}, elOptions = {} } = props
  const [files, setFiles] = React.useState([])

  const openFile = async() => {
    const file = await window.showOpenFilePicker(options)
    const files = []
    file.forEach((item) => {
      const formData = new FormData()
      formData.append('filename', item.name)
      formData.append('file', item)
      files.push(formData)
    })
    setFiles(files)
  }

  const openFileOld = (event) => {
    const eventFiles = event?.target?.files
    const files = []
    for (const file of eventFiles) {
      const formData = new FormData()
      formData.append('filename', file.name)
      formData.append('file', file)
      files.push(formData)
    }
    setFiles(files)
  }

  React.useEffect(() => {
    if(isNew && ref.current) {
      ref.current?.addEventListener('click', openFile)
    }
    else if(ref.current) {
      const fileInput = document.createElement('input')
      ref.current.style.position = 'relative'
      fileInput.setAttribute('type', 'file')
      fileInput.style.position = 'absolute'
      fileInput.style.width = '100%'
      fileInput.style.height = '100%'
      fileInput.style.top = '0'
      fileInput.style.left = '0'
      fileInput.style.opacity = '0'
      Object.keys(elOptions).map(item => {
        fileInput.setAttribute(item, elOptions?.[item])
      })
      fileInput.addEventListener('change', openFileOld)
      ref.current.appendChild(fileInput)
    }
  }, [isNew, ref.current])

  return [ref, files]
}

export default useUpload