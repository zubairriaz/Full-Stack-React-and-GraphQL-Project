
const mutationDefination = `
input PostInput{
    text:String!
}

input UserInput{
    username:String!
    avatar:String!
}

type RootMutation{
    addPost(post:PostInput!, user:UserInput!):Post
}

`;
const queryDefination = `
type Post {
    id:ID
    text:String
    user:User
}
type User{
    avatar:String
    username:String
}
type RootQuery{
    posts:[Post]
}
${mutationDefination}
schema{
    query:RootQuery
    mutation:RootMutation
}

`;


export default [queryDefination];
