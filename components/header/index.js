import styles from './index.less';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>NakamoriAkina</div>
      <div className={styles.right}>
        <div>设置</div>
        <div>修改</div>
        <div>用户名</div>
      </div>
    </div>
  );
};
export default Header;
