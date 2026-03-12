import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const API_URL = "https://cardapiou-eupi.onrender.com";

const deleteData = async (id: number) => {
  return await axios.delete(`${API_URL}/food/${id}`);
};

export function useFoodDataDelete() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food-data"] });
    },
  });

  return mutation;
}
