import {Component} from "react" 
import "./index.css"

class DigitalTimer extends Component {
    constructor(props){
        super(props)
        this.state = {
            timeElapsedInSec: 0,
            timeElapsedInMin: 20,
            isTimerRunning: false
        }
    } 

    render(){
        return(
            <>
                <div className="app-container">
                    <h1 className="heading">Digital Timer</h1>
                </div>
            </>
        )
    }
} 


export default DigitalTimer