import type { User as IUser } from '../../type/User';
import User from './User';

interface Props {
  users: { [id: string]: IUser };
}

export default function Users({ users } : Props): JSX.Element {
  return (
    <>
      {Object.entries(users).map(([id, { name, position, rotation }]) => (
        <User
          id={id}
          name={name}
          position={position}
          rotation={rotation}
        />
      ))}
    </>
  );
}
