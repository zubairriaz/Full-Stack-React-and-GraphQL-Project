const mutationDefination = `
input PostInput{
    text:String!
}

input ChatInput{
    users:[Int]
}

input UserInput{
    username:String!
    avatar:String!
}

input MessageInput {
    text: String!
    chatId: Int!
  }

type RootMutation{
    addPost(post:PostInput!):Post
    addChat(chat:ChatInput!):Chat
    addMessage (message: MessageInput!): Message
}

`;
const queryDefination = `
type Post {
    id:ID
    text:String
    user:User
}
type User {
    avatar:String
    username:String
}

type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }
  
  type Chat {
    id: Int
    messages: [Message]
    users: [User]
    lastMessage:Message

  }

type RootQuery {
    posts:[Post]
    chats:[Chat]
    chat(chatId:Int):Chat
}
${mutationDefination}
schema{
    query:RootQuery
    mutation:RootMutation
}

`;

export default [queryDefination];
