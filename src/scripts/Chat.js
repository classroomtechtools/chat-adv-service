const API = Symbol('discovery_api');
const RESOURCE = Symbol('resource');
const SERVICE = Symbol('service');
const MAP = Symbol('map');


class APIBase {
  constructor (service) {
    this.service = service;
    this.name = 'chat';
    this.version = 'v1';
    this[MAP] = new Map();
  }

  get [RESOURCE] () {
    throw new Error("Not implemented: [RESOURCE]");
  }

  [API] (method) {
    const cacheKey = `${this.name}${this.version}${method}`;
    if (this[MAP].has(cacheKey)) return this[MAP].get(cacheKey);
    const ret = Endpoints.$.createGoogEndpointWithOauth(this.name, this.version, this[RESOURCE], method, this.service);
    this[MAP].set(cacheKey, ret);
    return ret;
  }
}

/**
 * An instance of this class is created automatically when the code accesses the `Spaces` property. The documentation of the methods are available automatically. See example.
 * @class
 * @hideconstructor
 * @example
const Chat = ChatService('<>', '<>');
Chat.Spaces.list();  // already created!
 */
class Spaces extends APIBase {
  get [RESOURCE] () {
    return 'spaces';
  }

  /**
   * Lists spaces the caller is a member of. Returns {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces/list#response-body reponse body}, or else a json with `error` property. <{@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces/list Reference}>
   * @param {Object} [qp={}] - Query parameters
   * @param {Number} [qp.pageSize] - Number of maximum number of results returned
   * @param {String} [qp.pageToken] - page token, from previous call `nextPageToken`, if necessary
   * @return {Object}
   */
  list (qp={}) {
    return this[API]('list').createRequest('get', {}, {query:qp}).fetch().json;
  }

  /**
   * Returns a space. Returns {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces#Space an instance of space}, or else a json with `error` property. <{@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces/get Reference}>
   * @param {String} name - Required. Resource name of the space, in the form "spaces/*".
   * @return {Object}
   */
  get (name) {
    return this[API]('get').createRequest('get', {name}).fetch().json;
  }
}

/**
 * An instance of this class is created automatically when the code accesses the `Members` property. The documentation of the methods are available automatically. See example.
 * @class
 * @hideconstructor
 * @example
const Chat = ChatService('<>', '<>');
Chat.Members.list('<parentId>');  // already created!
 */
class Members extends APIBase {
  get [RESOURCE] () {
    return 'spaces.members';
  }

  /**
   * Returns {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.members#Membership an instance of membership}, or else a json with `error` property. <{@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.members/get Reference}>
   * @param {String} name - Required. Resource name of the membership to be retrieved, in the form "spaces&#47;&#42;&#47;members&#47;&#42;"
   * @return {Object}
   */
  get (name) {
    return this[API]('get').createRequest('get', {name}).fetch().json;
  }

  /**
   * Returns {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.members/list#response-body response body}, or else a json with `error` property. <{@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.members/list Reference}>
   * @param {String} parent - Required. The resource name of the space for which membership list is to be fetched, in the form "spaces&#47;&#42;".
   * @param {Object} [qp={}] - Query parameters
   * @param {Number} [qp.pageSize] - Number of maximum number of results returned
   * @param {String} [qp.pageToken] - page token, from previous call
   * @return {Object}
   */
  list (parent, qp={}) {
    return this[API]('list').createRequest('get', {parent}).fetch().json;
  }
}

/**
 * @class
 */
class Messages extends APIBase {
  get [RESOURCE] () {
    return 'spaces.messages';
  }

  /**
   * Creates a new thread in a room message. To create new message in new thread, pass string to text parameter. For more elaborate use, pass `null` to text param and use the body parameter for cards, etc.
   @param {String} parent - Required. Space resource name, in the form "spaces/*". Example: spaces/AAAAMpdlehY
   @param {String} text - The content of the message
   @param {Object} [body={}] - The {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.messages/create#request-body Message body}
   @example
const Chat = ChatService('<privateKey>', '<email>');
const result = Chat.Messages.create('<parentId>', "Content of simple text message in new thread");
   */
  create (parent, text, body={}) {
    if (!parent) throw new TypeError("Requires parent");
    if (text !== null) {
      // we have a simple message with just text
      return this[API]('create').createRequest('post', {parent}, {
        body: {text}
      }).fetch().json;
    }
    // we have something more elaborate
    return this[API]('create').createRequest('post', {parent}, {body}).fetch().json;
  }

  /**
   * Deletes a message
   * @param {String} name - Required. Resource name of the message to be deleted, in the form "spaces&#47;&#42;&#47;messages&#47;&#42;"
   */
  delete (name=null) {
    if (!name) throw new TypeError("Requires name");
    return this[API]('delete').createRequest('delete', {name}).fetch().json;
  }

  /**
   * Returns an {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.messages#Message instance of Message}.
   * @param {String} name - Required. Resource name of the message to be retrieved, in the form "spaces&#47;&#42;&#47;messages&#47;&#42;".
   * @return {Object}
   */
  get (name=null) {
    if (!name) throw new TypeError("Requires name");
    return this[API]('get').createRequest('get', {name}).fetch().json;
  }

  /**
   * Updates a message. Returns a message object.
   * @param {String} name - Resource name, in the form "spaces&#47;&#42;&#47;messages&#47;&#42;".
   * @param {String} updateMask - Required. The field paths to be updated, comma separated if there are multiple.
   * @param {Object} body - An instance of {@link https://developers.google.com/hangouts/chat/reference/rest/v1/spaces.messages#Message message}
   * @return {Object}
   */
  update (name, updateMask, {body={}}={}) {
    if (!name || !updateMask) throw new TypeError("Requires message_name and updateMask");
    return this[API]('update').createRequest('put', {"message.name": name}, {
      query: {updateMask},
      body
    }).fetch().json;
  }
}

/**
 * An instance of this class is returned with `ChatService.init` and this is how you should use it.
 * @class
 * @property {Spaces} Spaces - Rooms
 * @property {Members} Members - Who are in which rooms
 * @property {Messages} Messages - Messages in rooms
 * @property Media - Not yet implemented
 * @example
const Chat = ChatService.init('<privateKey>', '<email>');
 */
class Chatv1 {
  constructor (service) {
    this.service = service;
  }

  static getService (privateKey, email) {
    const scopes = ['https://www.googleapis.com/auth/chat.bot'];
    return Endpoints.$.makeGoogOauthService('MyChatService', email, privateKey, scopes);
  }

  static withService (service) {
    return new Chatv1(service);
  }

  get Spaces () {
    return new Spaces(this.service);
  }

  get Members () {
    return new Members(this.service);
  }

  get Messages () {
    return new Messages(this.service);
  }
}
