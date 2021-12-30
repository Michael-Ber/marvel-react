import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './findChar.scss';

const FindChar = () => {
    const [char, setChar] = useState(null);
    // const [process, setProcess] = useState('waiting');
    const [submitClicked, setSubmitClicked] = useState(false);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const setContent = (process, Component) => {
        switch(process) {
            case 'waiting':
                return null;
            case 'loading':
                return <Spinner />;
            case 'confirmed':
                return <Component />;
            case 'error':
                return <ErrorMessage />
            default:
                throw new Error('Unexpected process state');
        }
    }
    const updateChar = (name) => {
        clearError();
        setProcess('loading');
        getCharacterByName(name)
            .then(res => {setChar(res); setSubmitClicked(true)})
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('error'))
    }

    return (
        <div className="findChar">
            <Formik 
                initialValues = {{name: ''}}
                validationSchema = {yup.object({
                    name: yup.string().required('This field is required')
                })}
                onSubmit = {
                    ({name}) => {updateChar(name)}
                    }>
                <Form className="findChar__form">
                    <label htmlFor="name">Or find a character by name:</label>
                    <div className="findChar__form-wrapper">
                        <Field 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="findChar__input" 
                            placeholder="Enter name" />
                        
                        <button type="submit" className="findChar__submit btn btn-main">FIND</button>
                    </div>
                    <FormikErrorMessage name="name" component="div" className="findChar__msg-noname" />
                    {
                        setContent(process, () => { return(
                            char ? 
                            <div className="findChar__msg-wrapper">
                                <span className="findChar__msg findChar__msg_green">
                                    There is! Visit {char.name} page?
                                </span> 
                                <Link to={`/characters/${char.id}`} className="findChar__link btn btn-sec">TO PAGE</Link>
                            </div>
                            : null)
                        })
                    }
                    {!char && submitClicked ? <div className="findChar__msg-wrapper"><span className="findChar__msg">The character was not found. Check the name and try again</span></div>: null}
                </Form>
            </Formik>
            
            
        </div>
    )
}

export default FindChar;