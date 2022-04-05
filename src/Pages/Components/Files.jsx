import { useParams } from "react-router-dom"

export const Files = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>Files</div>
  )
}
