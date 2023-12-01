export interface Post {
  id: string;
  date: string;
  title: string;
  body: string;
}

export interface ListPost {
  [id: string]: Post;
}