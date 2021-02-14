/**
 * Create an object that can build requests and parry responses back via the Chatv1 API. It uses Oauth2 library to authenticate, and thus `privateKey` and `issuerEmail` is required. Continue interacting with api via the {@link Chatv1 Chatv1} object it returns.
 * @param {string} privateKey - Private Key as obtained via service account
 * @param {string} issuerEmail - Issuer Email as obtained via service account
 * @return {Chatv1}
 * @example
const Chat = ChatService.init('<privatekey>', '<issueremail>');
const response = Chat.Spaces.list();
Logger.log(response);
 */
function init(privateKey, issuerEmail) {
  const {Chatv1} = Import;
  const service = Chatv1.getService(privateKey, issuerEmail);
  return Chatv1.withService(service);
}


