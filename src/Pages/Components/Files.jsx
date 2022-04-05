import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFilesDoc } from "../../Firebase/firestore"

export const Files = () => {
  const { id } = useParams()
  const [files, setFiles] = useState([])
  const [ext, setExt] = useState([])

  useEffect(() => {
    const getFiles = async () => {
      const doc = await getFilesDoc(id)
      const getUrls = doc[0].files
      const getExt = getUrls.map( file => file.split('.')[5].substring(0, 3))
      setFiles(getUrls)
      setExt(getExt)
    }
    getFiles()
  }, [])
  

  return (
    <div className="w-full h-screen">
      {files.map((file, i) => {
        if(ext[i] === 'pdf') return (<iframe 
          width={'100%'}
          height='100%'
        src={file}>
    </iframe>)
        return (<img src={file} />)
      })}
    </div>
  )
}
