import React, { Component } from 'react'
import './Import.css'

class Import extends Component<any, any> {
    dropRef: React.RefObject<HTMLDivElement>
    constructor(props: any) {
        super(props)

        this.state = {
            file: null,
            audio: null,
            errorMessage: false,
        }
        this.dropRef = React.createRef<HTMLDivElement>()

        this.startAudio = this.startAudio.bind(this)
        this.stopAudio = this.stopAudio.bind(this)
        this.save = this.save.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        let div = this.dropRef.current
        div ?.addEventListener('dragover', this.handleDrag)
        div ?.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div ?.removeEventListener('dragover', this.handleDrag)
        div ?.removeEventListener('drop', this.handleDrop)
    }

    handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type === 'audio/mpeg') {
            this.setState({ file: e.dataTransfer.files[0] }, () => {
                this.setState({ audio: new Audio(URL.createObjectURL(this.state.file)) })
            })
            this.setState({ errorMessage: false })
        } else {
            this.setState({ errorMessage: true })
        }
    }

    startAudio() {
        this.state.audio.play()
    }

    stopAudio() {
        this.state.audio.pause()
        this.state.audio.currentTime = 0;
    }

    save() {
        this.state.audio.pause()
        this.state.audio.currentTime = 0;
        this.props.save({ title: this.state.file.name, file: this.state.audio, type: 'Import', index: -1 })
    }

    close() {
        if (this.state.audio != null) {
            this.state.audio.pause()
            this.state.audio.currentTime = 0;
        }
        this.props.close()
    }

    render() {
        return (
            <div className="popup">
                <h2 style={{ color: 'black', textAlign: 'left', marginLeft: '0.5em' }}>Import:</h2>
                <div className="drop-inner" ref={this.dropRef}>
                    <h4 style={{ color: '#64b5f6', fontSize: 'large' }}>Drop audio file here!</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: '1', textAlign: 'left' }}>
                    <label className={!this.state.errorMessage ? 'hidden' : ''} style={{ color: 'red' }}>
                        Error: File not supported. Please import .mp3 files only.
                    </label>
                    <label className={this.state.file === null ? 'hidden' : ''}>Current File: {this.state.file === null ? '' : this.state.file.name}</label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                    <div>
                        <button style={{backgroundColor: "#ef64f6"}} onClick={this.startAudio}>
                            Play
                        </button>
                        <button style={{backgroundColor: "#ef64f6"}} onClick={this.stopAudio}>
                            Stop
                        </button>
                        <div className="audio-error" style={{ display: 'none' }}>
                            Audio is not supported in this browser.
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <button style={{ backgroundColor: '#fa6464' }} onClick={this.close}>
                            Cancel
                </button>
                        <button style={{ backgroundColor: '#6afc8a' }} onClick={this.save}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Import
