import spinner from './spinner.gif';

const Spinner = (props) => {
    const alignGif = props ? {gridColumnStart: 2, justifySelf: 'end'}: {textAlign: 'center'};
    return (
        <div className="spinner" style={alignGif}>
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner;