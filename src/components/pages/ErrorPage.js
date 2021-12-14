import {Link} from 'react-router-dom';
import ErrorMessage from "../errorMessage/ErrorMessage";

const ErrorPage = () => {
    return (
        <> 
            <div style={{'textAlign': 'center'}}>
                <ErrorMessage />
            </div>
            <p style={{'textAlign': 'center', 'fontSize': '20px'}}>Page is not found</p>
            <Link to="/" style={{'fontSize': '20px', 'display': 'block', 'textAlign': 'center', 'marginTop': '20px'}}>Back to main</Link>
        </>
    )
}

export default ErrorPage;