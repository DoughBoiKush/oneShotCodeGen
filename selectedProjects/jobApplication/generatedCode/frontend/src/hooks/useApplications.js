import{useQuery,useMutation,useQueryClient}from'react-query';import{getApplications,createApplication,updateApplication,deleteApplication}from'../services/api';export const useApplications=()=>{return useQuery('applications',getApplications);};export const useCreateApplication=()=>{const queryClient=useQueryClient();return useMutation(createApplication,{onSuccess:()=>queryClient.invalidateQueries('applications')});};export const useUpdateApplication=()=>{const queryClient=useQueryClient();return useMutation(({id,data})=>updateApplication(id,data),{onSuccess:()=>queryClient.invalidateQueries('applications')});};export const useDeleteApplication=()=>{const queryClient=useQueryClient();return useMutation(deleteApplication,{onSuccess:()=>queryClient.invalidateQueries('applications')});};