import {LyreState} from "../../store";
import {connect} from "react-redux";
import {play, selectTonality, selectTonic, stop, updateDuration, updateVolume} from "../../store/player/Actions";
import {Home as HomeComponent} from "./Home";
import {bindActionCreators, Dispatch} from "redux";
import {PlayerAction} from "../../store/player/Types";


const mapStateToProps = (state: LyreState) => ({
  player: state.player
});

const mapDispatchToProps = (dispatch: Dispatch<PlayerAction>) => {
  return bindActionCreators(
    {updateDuration, selectTonic, selectTonality, updateVolume, play, stop},
    dispatch
  )
};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

