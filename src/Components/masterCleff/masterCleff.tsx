// @ts-ignore
import abcjs from "abcjs";
import React, { Component } from "react";
import { Container } from "./masterCleff.styled";

type abcState = {
  abcNotation: string;
  parserParams: object;
  engraverParams: object;
  renderParams: object;
  keyInput: string;
};

export class MasterCleff extends Component<
  {
    abcNotation: string;
    parserParams: object;
    engraverParams: object;
    renderParams: object;
  },
  abcState
> {
  uniqueNumber = Date.now() + Math.random();
  staff = undefined;
  midi = new abcjs.synth.CreateSynth();
  key = "C";

  constructor(
    props: Readonly<{
      abcNotation: string;
      parserParams: object;
      engraverParams: object;
      renderParams: object;
      close: () => void;
      setMusic: (title: string) => void;
    }>
  ) {
    super(props);

    this.state = {
      abcNotation: "",
      parserParams: {},
      engraverParams: {},
      renderParams: {},
      keyInput: "C",
    };
    // this.play = this.play.bind(this);
    // this.stop = this.stop.bind(this);
    this.renderAbcNotation = this.renderAbcNotation.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.render = this.render.bind(this);
  }

  renderAbcNotation(abcNotation: string, parserParams: object, engraverParams: object, renderParams: object) {
    this.staff = abcjs.renderAbc(
      "abcjs-result-" + this.uniqueNumber,
      abcNotation,
      parserParams,
      engraverParams,
      renderParams
    );
  }

  componentDidMount() {
    const { abcNotation, parserParams, engraverParams, renderParams } = this.props;
    console.log(abcNotation)
    this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams);
  }

  componentDidUpdate() {
    const { abcNotation, parserParams, engraverParams, renderParams } = this.state;
    this.renderAbcNotation(abcNotation, parserParams, engraverParams, renderParams);
  }

  //   play() {
  //     if (abcjs.synth.supportsAudio()) {
  //       // window.AudioContext =
  //       //   window.AudioContext ||
  //       //   window.webkitAudioContext ||
  //       //   navigator.mozAudioContext ||
  //       //   navigator.msAudioContext;
  //       var audioContext = new window.AudioContext();
  //       audioContext.resume().then(() => {
  //         return this.midi
  //           .init({
  //             visualObj: this.staff![0],
  //             audioContext: audioContext,
  //             // @ts-ignore
  //             millisecondsPerMeasure: this.staff[0].millisecondsPerMeasure(),
  //           })
  //           .then((response: any) => {
  //             // console.log(response); // this contains the list of notes that were loaded.
  //             // midiBuffer.prime actually builds the output buffer.
  //             return this.midi.prime();
  //           })
  //           .then(() => {
  //             // At this point, everything slow has happened. midiBuffer.start will return very quickly and will start playing very quickly without lag.
  //             this.midi.start();
  //             return Promise.resolve();
  //           })
  //           .catch(function (error: any) {
  //             if (error.status === "NotSupported") {
  //               var audioError = document.querySelector(".audio-error");
  //               if (audioError != null) audioError.setAttribute("style", "");
  //             } else console.warn("synth error", error);
  //           });
  //       });
  //     } else {
  //       var audioError = document.querySelector(".audio-error");
  //       if (audioError != null) audioError.setAttribute("style", "");
  //     }
  //   }

  //   stop() {
  //     this.midi.stop();
  //   }

  render() {
    return (
      <Container>
        <div id={"abcjs-result-" + this.uniqueNumber} style={{ width: "100%" }} />
      </Container>
    );
  }
}
