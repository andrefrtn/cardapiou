import { useEffect, useState } from "react";
import { useFoodDataUpdate } from "../../../hooks/useFoodDataUpdate";
import type { FoodData } from "../../../interface/FoodData";
import "../create-modal/modal.css";

interface EditModalProps {
  closeModal(): void;
  food: FoodData;
}

export function EditModal({ closeModal, food }: EditModalProps) {
  const [title, setTitle] = useState(food.title);
  const [price, setPrice] = useState<number | undefined>(food.price);
  const [image, setImage] = useState(food.image);
  const { mutate, isSuccess } = useFoodDataUpdate();

  const submit = () => {
    if (!price) {
      alert("Informe um preço!");
      return;
    }

    mutate({ id: food.id, title, price, image });
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Editar item</h2>

        <form className="input-container">
          <label>Nome:</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />

          <label>Preço:</label>
          <input type="number" value={price ?? ""} onChange={e => setPrice(e.target.value === "" ? undefined : Number(e.target.value))} />

          <label>Link da imagem:</label>
          <input value={image} onChange={e => setImage(e.target.value)} />
        </form>

        <button onClick={submit} className="btn-secondary">Salvar</button>
      </div>
    </div>
  );
}