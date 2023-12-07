type User = {
  name: string;
  image: string;
  phone: string;
  email?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
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
  createdAt: string;
  id?: string;
  image: string;
  isGroup: false;
  my_id: string;
  email: string;
  name: string;
  updatedAt?: string;
  user_id: string;
};
