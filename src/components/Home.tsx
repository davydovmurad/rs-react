import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { disableIsNew } from '../store/usersSlice';
import CustomLink from './ui/CustomLink';
import styles from './Home.module.css';

const Home = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const isNew = useSelector((state: RootState) => state.users.isNew);
  const dispatch = useDispatch();

  if (isNew) {
    setTimeout(() => {
      dispatch(disableIsNew());
    }, 2000);
  }

  return (
    <>
      <h1>Home</h1>

      <table className={styles.homeTable}>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Picture</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, id) => {
            const userNumber = id + 1;
            return (
              <tr
                key={userNumber}
                className={
                  isNew && userNumber === users.length ? styles.isNew : ''
                }
              >
                <td>{userNumber}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.gender}</td>
                <td>
                  <img src={user.picture} alt={`Picture ${userNumber}`} />
                </td>
                <td>{user.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <CustomLink to={'/form1'}>Form (uncontrolled components)</CustomLink>
      <CustomLink to={'/form2'}>React Hook Form</CustomLink>
    </>
  );
};

export default Home;
