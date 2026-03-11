import { useState } from "react"
import { createPortal } from "react-dom"
import "./card.css"
import { useFoodDataDelete } from "../../hooks/useFoodDataDelete"
import { EditModal } from "./create-modal/edit-modal"

interface CardProps {
  price: number
  title: string
  image: string
  id: number
}

export function Card({ price, title, image, id }: CardProps) {
  const { mutate: deleteFood } = useFoodDataDelete()
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="card">
      <img src={image}/>
      <h2>{title}</h2>
      <p><b>Valor:</b> R$ {price}</p>
      <button className="btn-editar" onClick={() => setIsEditOpen(true)}>Editar</button>
      <button className="btn-excluir" onClick={() => deleteFood(id)}>Deletar</button>

      {isEditOpen && createPortal(
        <EditModal
          closeModal={() => setIsEditOpen(false)}
          food={{ id, title, price, image }}
        />,
        document.body
      )}
    </div>
  )
}