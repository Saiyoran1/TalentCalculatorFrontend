import './ProgressBar.css';

function ProgressBar(props) {
    const {percentage} = props;
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    const progressColor = clampedPercentage > 33 ? clampedPercentage > 66 ? "good" : "medium" : "bad";
    return (
        <div className="progress-container">
            <div className={"progress " + progressColor} style={{width: clampedPercentage + "%"}}></div>
        </div>
       
)}

export default ProgressBar;