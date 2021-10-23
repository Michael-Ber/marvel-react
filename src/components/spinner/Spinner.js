import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <div className="spinner" style={{textAlign: 'center'}}>
            <img src={spinner} alt="spinner" />
        </div>
    )
}

export default Spinner;