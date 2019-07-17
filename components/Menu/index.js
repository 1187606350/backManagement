import styles from './index.less';
import NavLink from 'umi/navlink';
const Menu = () => {
  return (
    <ul>
      <li>
        <NavLink to="/" className={styles.active}>
          123
        </NavLink>
      </li>
      <li>
        <NavLink to="student" className={styles.active}>
          456
        </NavLink>
      </li>
    </ul>
  );
};
export default Menu;
