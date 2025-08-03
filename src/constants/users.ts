export const users = [
  {
    id: '1',
    name: 'Alice',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=47', // red hair woman avatar
    color: 'red',
    username: 'alice',
    password: 'admin123'
  },
  {
    id: '2',
    name: 'Bob',
    role: 'Editor',
    avatar: 'https://i.pravatar.cc/150?img=12', // blue shirt man avatar
    color: 'blue',
    username: 'bob',
    password: 'editor123'
  },
  {
    id: '3',
    name: 'Clara',
    role: 'Reviewer',
    avatar: 'https://i.pravatar.cc/150?img=32', // green tone avatar
    color: 'green',
    username: 'clara',
    password: 'reviewer123'
  },
  {
    id: '4',
    name: 'Dave',
    role: 'Viewer',
    avatar: 'https://i.pravatar.cc/150?img=8', // grayscale tone avatar
    color: 'gray',
    username: 'dave',
    password: 'viewer123'
  }
] as const;

export type Role = 'Admin' | 'Editor' | 'Reviewer' | 'Viewer';
