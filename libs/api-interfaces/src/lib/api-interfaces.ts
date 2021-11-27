export interface IMessage {
  message: string;
}

export interface IBoard {
  _id: string;
  title?: string;
  userId?: string;
  columns: IColumn[];
  created?: Date;
}

export interface IColumn {
  _id: string;
  boardId: string;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  _id: string;
  columnId: string;
  title: string;
  order: number;
  likes: ILike[];
  comments: IComment[];
}

export interface ILike {
  userId: string;
}

export interface IComment {
  userId?: string;
  text: string;
}
