export interface Post {
  id: string;
  dateTime: string;
  title: string;
  body: string;
}

export interface ListPost {
  [id: string]: Post;
}