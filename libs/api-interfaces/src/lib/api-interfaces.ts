export interface IMessage {
  message: string;
}

export interface IBoard {
  id: string;
  title: string;
  userId: string;
  columns: IColumn[];
  created: Date;
}

export interface IColumn {
  title: string;
  tasks: ITask[];
}

export interface ITask {
  id?: string;
  title: string;
  likes?: ILikes[];
  comments?: IComments[];
}

export interface ILikes {
  taskId?: string;
  userId?: string;
}

export interface IComments {
  taskId?: string;
  userId?: string;
  text: string;
}
