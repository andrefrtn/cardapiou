import axios from "axios";
import type { FoodCreate  } from "../interface/FoodData";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodCreate ) => {
  return await axios.post(API_URL + "/food", data);
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ["food-data"] });    },
  });

return mutate;
}