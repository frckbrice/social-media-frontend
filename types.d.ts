type User = {
  name: string;
  image: string;
  phone: string;
  email?: string;
  id?: string;
};

type Message = {
  id: string;
  sender_id: string;
  receiver_room_id: string;
  content: string;
  create_at: string;
  upated_at: string;
  reaction: string;
  sender_name: string;
  sender_phone: string;
  is_read: boolean;
};

type RoomUser = {
  id?: string;
  user_id: string;
  room_id: string;
  role: string;
};

type Room = {
  id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  isGroup: boolean;
};
