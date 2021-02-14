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

## Usage

The methods in this library reach out to the endpoints, parse it as json, and then return the result from the endpoint. However, you may want more control over those interactions. 

Perhaps you are getting an error and want to see the request that's being built on your behalf, to help troubleshoot. No problem:

```js
const Chat = ChatService.init('<privateKey>', '<issuerEmail>');
const roomRequest = Chat.Spaces.config({request: true}).list();
const {url, params} = roomRequest.getParams();
```

The way it works is putting `config({request: true})` in front of the method call `list()`. It overrides the default behaviour of fetching the request and parsing it to json, instead returning the request object saved in `roomRequest`. 

Or, you might want to take advantage of the `fields` "[system parameter](https://cloud.google.com/apis/docs/system-parameters)". All that does is filter out the keys in the json response, so if you get back a large json with huge content, but you only use `name` key in the response, `?fields=name` as a query parameter in the url will tell Google's APIs to filter out everything except `name`. It can improve the snappiness of the roundtrips.

```js
const room = Chat.Messages.config({fields: 'createTime'}).create();
```

That will make send `createTime` in fields to the create message endpoint, which can return a very large object in return. But if you're just creating it you probably don't need the endpoint to be so verbose.

Combining the two is possible: 

```js
const roomRequest = Chat.Messages.config({request: true, fields: 'createTime'})
                                 .create();
const {params} = roomRequest.getParams();
Logger.log(params);  // {_fields='createTime', url: ...}
```

## Motivation

AppsScript doesn't have a native advanced service to interact with the Chat API. And I need one, so I made one!

## Possible Use Cases

- A Google Form that opens a new thread on a Google Chat room on submission
- Poll your domain for Chat room activity

## Issues?

Currently used in production, but feedback welcome. Thanks for any contributions. Use the issue [github tracker](https://github.com/classroomtechtools/chat-adv-service/issues) for issues.
