const bankOne = [
  {
    key: "Q",
    id: "Heater-1",
    keycode: 81,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    id: "Heater-2",
    keycode: 87,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    id: "Heater-3",
    keycode: 69,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    id: "Heater-4",
    keycode: 65,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    id: "Clap",
    keycode: 83,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    id: "Open-HH",
    keycode: 68,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    id: "Kick",
    keycode: 90,
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "X",
    id: "Kick-n'-Hat",
    keycode: 88,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "C",
    id: "Closed-HH",
    keycode: 67,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    key: "Q",
    id: "Chord-1",
    keycode: 81,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    key: "W",
    id: "Chord-2",
    keycode: 87,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    key: "E",
    id: "Chord-3",
    keycode: 69,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    key: "A",
    id: "Shaker",
    keycode: 65,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    key: "S",
    id: "Closed-HH",
    keycode: 83,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    key: "D",
    id: "Open-HH",
    keycode: 68,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    key: "Z",
    id: "Punchy-Kick",
    keycode: 90,
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    key: "X",
    id: "Snare",
    keycode: 88,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
  {
    key: "C",
    id: "Side-Stick",
    keycode: 67,
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBank: [],
      power: true,
      display: "",
    };
    this.handlePower = this.handlePower.bind(this);
    this.handleBank = this.handleBank.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }
  componentDidMount() {
    this.setState({
      currentBank: bankOne,
    });
  }
  handleDisplay(value) {
    if (this.state.power === true) {
      this.setState({
        display: value,
      });
    }
  }
  handlePower() {
    this.setState({
      power: this.state.power === true ? false : true,
      display: "",
    });
  }
  handleBank() {
    let currBank = this.state.currentBank;
    this.setState({
      currentBank: currBank === bankOne ? bankTwo : bankOne,
      display: currBank === bankOne ? "Piano Kit" : "Heater Kit",
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div className="grid-left">
          <Screen display={this.state.display} />
          <Bank
            handleBank={this.handleBank}
            bankStyle={this.state.currentBank === bankOne ? "left" : "right"}
          />
        </div>
        <div className="grid-right">
          <Power
            handlePower={this.handlePower}
            colorPower={this.state.power === true ? "#1eff09" : "#ff2f00"}
          />
          <DrumButtons
            bank={this.state.currentBank}
            power={this.state.power}
            handleDisplay={this.handleDisplay}
          />
        </div>
      </div>
    );
  }
}
class DrumButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let bank;
    if (this.props.power === true) {
      bank = this.props.bank.map((el) => {
        return (
          <Pad
            clipId={el.id}
            keyTrigger={el.key}
            url={el.url}
            keycode={el.keycode}
            power={this.props.power}
            handleDisplay={this.props.handleDisplay}
          />
        );
      });
    } else {
      bank = this.props.bank.map((el) => {
        return (
          <Pad
            clipId={el.id}
            keyTrigger={el.key}
            url="#"
            keycode={el.keycode}
            power={this.props.power}
          />
        );
      });
    }
    return <div className="pad-container">{bank}</div>;
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
    this.handleClipId = this.handleClipId.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.activePadStyle = {
      boxShadow: "1px 1px 2px black",
      filter: "brightness(1.5)",
      transform: "translate(2px, 3px)",
    };
    this.inactivePadStyle = { boxShadow: "3px 3px 5px 1px #333" };
    this.offStyle = {
      boxShadow: "1px 1px 2px black",
      transform: "translate(2px, 3px)",
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.setState({
      style: this.inactivePadStyle,
    });
  }
  changeStyle() {
    this.setState({
      style: this.props.power === true ? this.activePadStyle : this.offStyle,
    });
    setTimeout(
      () =>
        this.setState({
          style: this.inactivePadStyle,
        }),
      100
    );
  }
  handleKeyPress(e) {
    let id = String.fromCharCode(e.keycode);
    if (e.keycode === this.props.keycode) {
      document.getElementById(this.props.clipId).click();
    }
  }
  handlePlay(audio) {
    audio.load();
    audio.play();
  }
  handleClick(e) {
    let audio = document.getElementById(e.target.value);
    this.handlePlay(audio);
    this.changeStyle();
    this.handleClipId(e);
  }
  handleClipId(e) {
    let value = e.target.id.replace(/-/g, " ");
    this.props.handleDisplay(value);
  }
  render() {
    return (
      <button
        className="drum-pad"
        id={this.props.clipId}
        keycode={this.props.keycode}
        onClick={this.handleClick}
        value={this.props.keyTrigger}
        onKeyPress={this.handleKeyPress}
        style={this.state.style}
      >
        {this.props.keyTrigger}
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.url}
          preload="auto"
        />
      </button>
    );
  }
}
const Screen = (props) => {
  return (
    <div id="display">
      <div className="display-text">{props.display}</div>
    </div>
  );
};
const Power = (props) => {
  return (
    <i
      className="fas fa-power-off"
      style={{ fontSize: "30px", float: "right", color: props.colorPower }}
      onClick={props.handlePower}
    />
  );
};
const Bank = (props) => {
  return (
    <div>
      <p>Bank</p>
      <div className="bank-button-container" onClick={props.handleBank}>
        <div className="bank-button" style={{ float: props.bankStyle }}></div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
