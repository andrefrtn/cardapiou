import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { FoodData } from "../interface/FoodData"

const API_URL = "https://cardapiou.onrender.com"

const updateFood = async (food: FoodData) => {
  const response = await axios.put(`${API_URL}/food/${food.id}`, food)
  return response.data
}

export function useFoodDataUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["food-data"] })
    }
  })
}
