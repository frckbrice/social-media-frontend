type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

type ChatRoom = {
  createdAt: string;
  id: string;
  image: string;
  isGroup: false;
  my_id: string;
  email: string;
  name: string;
  updatedAt: string;
  user_id: string;
};
