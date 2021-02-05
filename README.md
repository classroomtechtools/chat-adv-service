# Chat Advanced Service

Interact with the Google Chat API via AppsScripts.

## Getting Started

- Create a service account that has access to Chat API
- Add `ChatService` to your project with Library ID  `1XDYAGcUoblJ073Kjveni2WOZHpKLYE8qlYMkeHViavLXvsKnBIl1DR2A`
- Send the `privateKey` and `issuerEmail` to the `ChatService.init` method
- The returning object has `Spaces`, `Members`, and `Messages` namespaces, which themselves have methods that match the [reference documentation](https://developers.google.com/hangouts/chat/reference).

```js
const Chat = ChatService.init('<privateKey>', '<issuerEmail>');
const rooms = Chat.Spaces.list();
Logger.log(rooms);
```

- Use the [provided documentation](https://classroomtechtools.github.io/chat-adv-service/) for learn how to use all of these methods.

## Motivation

AppsScript doesn't have a native advanced service to interact with the Chat API. And I need one, so I made one!

## Possible Use Cases

- A Google Form that opens a new thread on a Google Chat room on submission
- 

## Issues?

Currently used in production, but feedback welcome. Thanks for any contributions. Use the issue [github tracker](https://github.com/classroomtechtools/chat-adv-service/issues) for issues.