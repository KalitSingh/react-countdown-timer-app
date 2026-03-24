import {Component} from "react" 
import "./index.css"

class DigitalTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timeElapsedInSec: 0,
            timerLimitInMin: 5,
            isTimerRunning: false
        }
    }

    // Click event of +(incre timer) button on Timer Limit controller 
    onClickPlusIncre = () => {
        this.setState(prevState => ({timerLimitInMin: prevState.timerLimitInMin + 1}))
    }

     // Click event of -(decre timer) button on Timer Limit controller 
    onClickMinusDecre = (event) => {
        const {timerLimitInMin} = this.state

        if (timerLimitInMin < 0){
            alert("Timer Value Can't Be Negative")
        } else{
            this.setState(prevState => ({timerLimitInMin: prevState.timerLimitInMin - 1}))
        }
        
    }
    
    // + and - 
    renderTimerLimitController = () => {
        const {timerLimitInMin, isTimerRunning} = this.state 
        console.log(timerLimitInMin < 0)
        
        // minusButtonDisalbed is for handling -ve input number from user
        const isMinusButtonDisabled = (isTimerRunning || (timerLimitInMin <= 0)) ? true : false;
        const isButtonDisabled = isTimerRunning ? true : false;

        return(
            <>
            <p className="timer-mimit-title">Set Timer</p>
            <div className="timer-limit-controller-container">
                <button type="button" disabled={isButtonDisabled} onClick={this.onClickPlusIncre} className="timer-limit-button">+</button>
                <div>
                    <input className="timerLimitInputValue" value={timerLimitInMin} type="number" />
                </div>
                <button type="button" disabled={isMinusButtonDisabled} onClick={this.onClickMinusDecre} className="timer-limit-button">-</button>
            </div>
            </>
        )
    }

    // callback function of setInterval(), interval Engine Part
    incrementElapsedTimeInSec = () => {
        const {timerLimitInMin, timeElapsedInSec} = this.state 

        const isTimerCompleted = timerLimitInMin * 60 === timeElapsedInSec

        // System Action(Internal Logic of Timer): Agar timer pura hua to incrementing time ko rok do incrment hone se
        if (isTimerCompleted){
            clearInterval(this.timerId)
        } 
        else {
            this.setState((prevState) => ({timeElapsedInSec: prevState.timeElapsedInSec + 1}))
        }
    }

    // This is for - when reset button is clicked 
    onResetTimer = () => {
        const {timerLimitInMin} = this.state

        clearInterval(this.timerId)
        this.setState({timerLimitInMin: 45, timeElapsedInSec: 0, isTimerRunning: false})
        
    }

    // This below is for - When Start or Pause Button Clicked
    onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSec, timerLimitInMin} = this.state 

    const isTimerCompleted = timeElapsedInSec === timerLimitInMin * 60;

    // User Action (For UI): To Reset Timer Seconds from Elapsed to 1 in UI
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

        const startOrPauseAltAttribute = isTimerRunning ? "Pause icon" : "Start icon";

        return(
            <div className="timer-controller-container">
                <button 
                    type="button"
                    onClick={this.onStartOrPauseTimer}
                    className="timer-controller-btn">
                    <img alt={startOrPauseAltAttribute} className="timer-controller-icon" src={startOrPauseImgUrl} />
                    <p className="timer-controller-label">{isTimerRunning ? "Pause" : "Start"}</p>
                </button>
                <button 
                    type="button"
                    onClick={this.onResetTimer}
                    className="timer-controller-btn">
                    <img alt="reset-icon" className="timer-controller-icon" src="https://res.cloudinary.com/dkr51xeft/image/upload/v1774177891/react-projects/react-countdown-timer-app/reset-icon-img_mwtgkt.png" />
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