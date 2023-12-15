import { getAllRooms, getUnreadMessages } from "./service/queries";
// export async function encryptMessage(message: any, publicKey: any) {
//   const encrypted = await openpgp.encrypt({
//     message: await openpgp.createMessage({ text: message }), // input as Message object
//     encryptionKeys: publicKey,
//   });
//   return encrypted;
// }

// export async function decryptMessage(encryptedMessage: any, privateKey: any) {
//   const message = await openpgp.readMessage({
//     armoredMessage: encryptedMessage, // parse armored message
//   });
//   const { data: decrypted, signatures } = await openpgp.decrypt({
//     message,
//     decryptionKeys: privateKey,
//   });
//   return decrypted;
// }

// //generate key pairs

// export async function generateKeyPair() {
//   const { privateKey, publicKey } = await openpgp.generateKey({
//     type: "rsa", // Type of the key
//     rsaBits: 4096, // RSA key size (defaults to 4096 bits)
//     userIDs: [{ name: "User", email: "jon@example.com" }],
// you can pass multiple user IDs
//     passphrase: "super long and hard to guess secret", // protects the private key
//   });
//   return { privateKey, publicKey };
// }

export const updateNotifications = (arr1: any[], arr2: any[], me: string) => {
  return arr1
    ?.reduce(
      (acc, curr) => {
        return acc?.map((item: any) => {
          if (
            (item?.original_dm_roomID &&
              item.original_dm_roomID === curr.sender_id.toString() &&
              curr?.receiver_room_id.toString() === me) ||
            (item?.isGroup &&
              curr.receiver_room_id.toString() === item.id.toString())
          ) {
            return {
              ...item,
              unread_count: curr?.unread_count,
              last_message: curr?.last_message,
              updatedAt: curr?.updatedAt,
            };
          } else
            return {
              ...item,
              unread_count: 0,
              last_message: "",
              updatedAt: item?.updatedAt,
            };
        });
      },
      [...arr2]
    )
    ?.map((item: any) => {
      if (item._doc)
        return {
          name: item?._doc.name,
          image: item?._doc.image,
          isGroup: item?._doc.isGroup,
          user_id: item?._doc.user_id,
          my_id: item?._doc.my_id,
          createdAt: item?._doc.createdAt,
          updatedAt: item?._doc.update,
          original_dm_roomID: item?._doc.original_dm_roomID,
          id: item?._doc._id,
          unread_count: item?.unread_count,
          last_message: item?.last_message,
        };
      else
        return {
          name: item?.name,
          image: item?.image,
          isGroup: item?.isGroup,
          user_id: item?.user_id,
          my_id: item?.my_id,
          createdAt: item?.createdAt,
          updatedAt: item?.updatedAt,
          original_dm_roomID: item?.original_dm_roomID,
          id: item?.id,
          unread_count: item?.unread_count,
          last_message: item?.last_message,
        };
    });
};

export async function revalidateData(me: string) {
  const chats = await getAllRooms(me);
  console.log(chats);
  const unread_messages = await getUnreadMessages();
  return updateNotifications(unread_messages, chats, me);
}
