import styles from './index.css';
import Header from './../../components/header';
import Menu from './../../components/Menu';
const SimpleLayout = props => {
  return <div>{props.children}</div>;
};

export default function(props) {
  if (props.location.pathname === '/login') {
    return <SimpleLayout {...props} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Header />
      </div>
      <div className={styles.bottom}>
        <div className={styles.bleft}>
          <Menu />
        </div>
        <div className={styles.bright}>{props.children}</div>
      </div>
    </div>
  );
}
