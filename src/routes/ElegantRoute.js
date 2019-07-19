import { connect } from 'dva';
import { Redirect } from 'dva/router';
const ElegantRoute = props => {
  if (props.username) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default connect(
  state => {
    return {
      username: state.user.username,
    };
  },
  null,
)(ElegantRoute);
