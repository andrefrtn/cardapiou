import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../../hooks/useFoodDataMutate";
import type { FoodCreate } from "../../../interface/FoodData";
import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void;
  type?: string;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue, type = "text" }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => updateValue(event.target.value)}
      />
    </>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [image, setImage] = useState("");
  const { mutate, isSuccess, reset } = useFoodDataMutate();
  

const submit = () => {
  if (!price) {
    alert("Informe um preço!");
    return;
  }

const foodData: FoodCreate = {
  title,
  price: Math.round(price), 
  image,
};
mutate(foodData, {
  onSuccess: () => closeModal()
});
};

useEffect(() => {
  if (isSuccess) {
    closeModal();
    reset(); 
  }
}, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <button className="close-btn" onClick={closeModal}>X</button>
        <h2>Cadastre um novo item no cardápio</h2>

        <form className="input-container">
          <Input label="Nome:" value={title} updateValue={setTitle} />
          <Input
            label="Preço:"
            type="number"
            value={price ?? ""}
            updateValue={(val) => setPrice(val === "" ? undefined : Number(val))}
          />
          <Input label="Link da imagem:" value={image} updateValue={setImage} />
        </form>

        <button onClick={submit} className="btn-secondary">Postar</button>
      </div>
    </div>
  );
}