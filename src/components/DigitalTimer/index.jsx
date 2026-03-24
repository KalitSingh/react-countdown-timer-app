import {Component} from "react" 
import "./index.css"

class DigitalTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timeElapsedInSec: 0,
            timerLimitInMin: 1,
            isTimerRunning: false
        }
    }

    renderTimerLimitController = () => {
        return(
            <h1>controls btn</h1>
        )
    }

    // callback function of setInterval(), interval Engine Part
    incrementElapsedTimeInSec = () => {
        const {timerLimitInMin, timeElapsedInSec} = this.state 

        const isTimerCompleted = timerLimitInMin * 60 === timeElapsedInSec

        if (isTimerCompleted){
            clearInterval(this.timerId)
        } 
        else {
            this.setState((prevState) => ({timeElapsedInSec: prevState.timeElapsedInSec + 1}))
        }
    }

    onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSec, timerLimitInMin} = this.state 

    const isTimerCompleted = timeElapsedInSec === timerLimitInMin * 60;
    if (isTimerCompleted) {
        clearInterval(this.timerId)
        this.setState({timeElapsedInSec: 1})
    } 
    if (isTimerRunning){
        clearInterval(this.timerId)
    } else{
        this.timerId = setInterval(this.incrementElapsedTimeInSec, 1000)
    }

    this.setState({isTimerRunning: !isTimerRunning})

    }

    renderTimerController = () => {
        const {isTimerRunning} = this.state 
        const startOrPauseImgUrl = isTimerRunning 
        ? "https://res.cloudinary.com/dkr51xeft/image/upload/v1774177879/react-projects/react-countdown-timer-app/play-icon-img_nai3pd.png" 
        : "https://res.cloudinary.com/dkr51xeft/image/upload/v1774177869/react-projects/react-countdown-timer-app/pause-icon-img_wtlzxf.png";

        return(
            <div className="timer-controller-container">
                <button 
                    onClick={this.onStartOrPauseTimer}
                    className="timer-controller-btn">
                    <img className="timer-controller-icon" src={startOrPauseImgUrl} />
                    <p className="timer-controller-label">{isTimerRunning ? "Pause" : "Start"}</p>
                </button>
                <button className="timer-controller-btn">
                    <img className="timer-controller-icon" src="https://res.cloudinary.com/dkr51xeft/image/upload/v1774177891/react-projects/react-countdown-timer-app/reset-icon-img_mwtgkt.png" />
                    <p className="timer-controller-label">Reset</p>
                </button>
            </div>
        )
    }

    getElapsedSecondsInTimerFormat = () =>{
        const {timeElapsedInSec, timerLimitInMin} = this.state 

        // Converting User given Input number into Seconds 
        const totalRemainaingTimeInSec = timerLimitInMin * 60 - timeElapsedInSec 
        // Extracting Minutes from totalSeconds
        const timeInMin = Math.floor(totalRemainaingTimeInSec / 60)
        // Extracting Remaining Seconds as few remainder rest when we convert any number to minutes format, that remainder calculating below
        const timeInSec = Math.floor(totalRemainaingTimeInSec % 60) 

        // handling single digit and double digit time(min and sec)
        const stringifiedMinutes = timeInMin > 9 ? timeInMin : `0${timeInMin}`;
        const stringifiedSeconds = timeInSec > 9 ? timeInSec : `0${timeInSec}`;

        // formatting in 00:00 format as given in UI
        return `${stringifiedMinutes} : ${stringifiedSeconds}`
    }
    render(){
        const {isTimerRunning, timeElapsedInSec} = this.state 
        console.log(timeElapsedInSec)
        const labelText = isTimerRunning ? "Running" : "Paused";

        return(
            <>
                <div className="app-container">
                    <h1 className="heading">Digital Timer</h1>
                    <div className="digital-timer-container">
                        <div className="timer-display-container">
                            <div className="elapsed-time-container">
                                <h1 className="elapsed-time">
                                    {this.getElapsedSecondsInTimerFormat()}
                                </h1>
                                <p className="timer-state">{labelText}</p>
                            </div>
                        </div>
                        <div className="controls-container">
                                {this.renderTimerController()}
                                {this.renderTimerLimitController()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
} 


export default DigitalTimer