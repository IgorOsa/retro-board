import * as mongoose from 'mongoose';
import { BoardSchema } from '../board/schemas/board.schema';

const mockBoardData = {
  id: '1',
  title: 'Demo Board',
  userId: '1',
  columns: [
    {
      title: 'backlog',
      tasks: [
        {
          id: '1',
          title: 'Get to work',
          likes: [{ userId: '1' }, { userId: '2' }],
          comments: [{ text: 'Good' }, { text: 'Great' }],
        },
        {
          id: '2',
          title: 'Pick up groceries',
          likes: [],
          comments: [{ text: 'So so' }, { text: 'Not Bad' }],
        },
        {
          id: '3',
          title: 'Fall asleep',
          likes: [{ userId: '1' }, { userId: '2' }, { userId: '3' }],
          comments: [{ text: 'Normal' }],
        },
        { id: '4', title: 'Have some fun', likes: [], comments: [] },
      ],
    },
    {
      title: 'todo',
      tasks: [{ title: 'Go home' }, { title: 'Fall asleep' }],
    },
    {
      title: 'done',
      tasks: [
        { title: 'Pick up groceries' },
        { title: 'Go home' },
        { title: 'Have some fun' },
      ],
    },
  ],
  created: new Date(Date.now()),
};

export const mockBoard = () => {
  const Board = mongoose.model('Board', BoardSchema);
  const mockData = new Board(mockBoardData);
  mockData.collection.drop();
  mockData.save();
};
