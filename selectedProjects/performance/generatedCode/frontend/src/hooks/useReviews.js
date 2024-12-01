import { useQuery, useMutation, useQueryClient } from "react-query";
import { getReviews, createReview } from "../services/api";
export const useReviews = () => {
  return useQuery("reviews", getReviews);
};
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation(createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });
};
