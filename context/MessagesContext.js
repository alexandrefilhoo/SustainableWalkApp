 /*
 Context for messages management. Initializes the messages state and provides 
 funtions to add and delete messages.
 */

import React, { createContext, useState, useContext } from "react";

//initialize messages context
const MessagesContext = createContext();

// Define a provider component for MessagesContext
export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    // {
    //   id: "1",
    //   name: "Aline Thomas",
    //   message: "Sounds good to me. Same place at 6. See you later!",
    //   time: "14:16",
    //   image: require("../images/person-10.jpeg"),
    // },
    // {
    //   id: "2",
    //   name: "Clarisse Alves",
    //   message:
    //     "I have seen your bio and it looks like we share the same hobbies. Let’s organize a day...",
    //   time: "14:16",
    //   image: require("../images/person-2.jpg"),
    // },
    // {
    //   id: "3",
    //   name: "Elton Thomas",
    //   message:
    //     "I will finish my class at 4. We can meet at 6 in the same place with Aline.",
    //   time: "14:55",
    //   image: require("../images/person-3.jpeg"),
    // },
    // {
    //   id: "4",
    //   name: "Amanda Jones",
    //   message:
    //     "This Friday I will play tennis with some friends. Would you like to come?",
    //   time: "Yesterday",
    //   image: require("../images/person-4.jpg"),
    // },
    // {
    //   id: "5",
    //   name: "Wei Li",
    //   message:
    //     "This week I have to complete some coursework, but next week I will be free.",
    //   time: "Yesterday",
    //   image: require("../images/person-5.jpg"),
    // },
    // {
    //   id: "6",
    //   name: "Alexandra Moore",
    //   message:
    //     "I don’t know if I am available this week. Maybe next Tuesday I may. Sorry",
    //   time: "Monday",
    //   image: require("../images/person-6.jpeg"),
    // },
    // {
    //   id: "7",
    //   name: "Stefano Cipriani",
    //   message: "Yes. I can jog with tomorrow.",
    //   time: "Monday",
    //   image: require("../images/person-7.webp"),
    // },
    // {
    //   id: "8",
    //   name: "Sara Williams",
    //   message: "Sure. I’ll let you know later on.",
    //   time: "Monday",
    //   image: require("../images/person-8.jpg"),
    // },
    // {
    //   id: "9",
    //   name: "Min Zhou",
    //   message: "See ya! 😊",
    //   time: "Sunday",
    //   image: require("../images/person-9.jpg"),
    // },
  ]);


  // Add new messages to the state
   const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  //Delete Messsages using arrays containing IDs
  const deleteMessages = (ids) => {
    setMessages(messages.filter((message) => !ids.includes(message.id)));
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, deleteMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};
export const useMessages = () => useContext(MessagesContext);
