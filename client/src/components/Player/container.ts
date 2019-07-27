import {Player} from "./component";

import {AppState} from "../../store";
import {connect} from "react-redux";
import {updateDuration} from "../../store/player/actions";

const mapStateToProps = (state: AppState) => ({
  player: state.player
});

export default connect(
  mapStateToProps,
  {updateDuration}
)(Player);

