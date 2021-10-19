import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className="skeleton">
            <span>Please select a character to see information</span>
            <div className="skeleton-up">
                <div className="skeleton-circle"></div>
                <div className="skeleton-rect small"></div>
            </div>
            <div className="skeleton-rect big"></div>
            <div className="skeleton-rect big"></div>
            <div className="skeleton-rect big"></div>
        </div>
    )
} 

export default Skeleton; 