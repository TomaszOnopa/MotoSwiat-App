import './styles.css';

const Popup=(props)=> {
    return(props.trigger) ? (
        <div className="popup-container">
            <div className="popup">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>
                    <img src='/close.png' alt=''/>
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;