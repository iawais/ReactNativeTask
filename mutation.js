import { gql } from '@apollo/client';


export const POST_JOB = gql`
    mutation postJob(
        $title: String!,
        $commitmentId: ID!,
        $companyName: String!,
        $locationName: String!,
        $userEmail: String!,
        $description: String!,
        $applyUrl: String!,
    ){
        postJob(
            title : $title
            commitmentId : $commitmentId 
            companyName : $companyName 
            locationNames : $locationName 
            userEmail : $userEmail 
            description : $description 
            applyUrl : $applyUrl 
        ){
            title
            commitmentId
        }
    }
`;