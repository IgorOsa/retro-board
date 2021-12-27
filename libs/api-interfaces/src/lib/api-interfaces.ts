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
  userId: string;
  userName?: string;
  columnId: string;
  title: string;
  order: number;
}

export interface ITaskWithCommentsAndLikes extends ITask {
  comments?: IComment[];
  likes?: ILike[];
}

export interface ILike {
  _id?: string;
  userId: string;
  taskId: string;
}

export interface IComment {
  _id: string;
  userId: string;
  userName?: string;
  taskId: string;
  text: string;
}
