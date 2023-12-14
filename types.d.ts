type User = {
  id: string;
  image: string;
  name: string;
  updatedAt?: string;
  createdAt?: string;
  phone: string;
  email: string;
};

type Message = {
  id: string;
  sender_id: string;
  receiver_room_id: string;
  content: string;
  updatedAt: string;
  reaction: string;
  sender_name: string;
  sender_phone: string;
  is_read: boolean;
  createdAt: string;
};

type RoomUser = {
  id?: string;
  user_id: string;
  room_id: string;
  role: string;
};

type Room = {
  id: string;
  image: string;
  isGroup?: boolean;
  my_id: string;
  name: string;
  updatedAt?: string;
  createdAt?: string;
  user_id: string;
  phone: string;
  email: string;
  original_dm_roomID?: string;
  last_message?: string;
  unread_count?: number;
};

type AddMembersProps = {
  members: string[];
  room_id: string;
};
