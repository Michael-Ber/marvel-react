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
    const [firstLoad, setFirstLoad] = useState(false);
    const {loading, error, getCharacterByName} = useMarvelService();

    const errorMessage = error ? <ErrorMessage />: null;
    const loadingMsg = loading ? <div style={{marginTop: '10px', textAlign: 'center'}}><Spinner /></div>: null;
    const content = (!error) ? <View char={char} setChar={setChar} firstLoad={firstLoad} setFirstLoad={setFirstLoad} getCharacterByName={getCharacterByName} loading={loading}/>: null;
    return (
        <div className="findChar">
            {content}
            {errorMessage}
            {loadingMsg}
        </div>
    )
}

    const View = ({char, setChar, firstLoad, setFirstLoad, getCharacterByName, loading}) => {
        return (
            <Formik 
                initialValues = {{name: ''}}
                validationSchema = {yup.object({
                    name: yup.string().required('This field is required')
                })}
                onSubmit = {
                    values => {
                        getCharacterByName(values.name)
                            .then(res => {setChar(res); setFirstLoad(true)})
                    }
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
                    {char && !loading ? 
                    <div className="findChar__msg-wrapper">
                        <span className="findChar__msg findChar__msg_green">
                            There is! Visit {char.name} page?
                        </span> 
                        <Link to={`/characters/${char.id}`} className="findChar__link btn btn-sec">TO PAGE</Link>
                    </div>
                    : null}
                    {!char && firstLoad && !loading ? <div className="findChar__msg-wrapper"><span className="findChar__msg">The character was not found. Check the name and try again</span></div>: null}
                </Form>
            </Formik>
        )
}
export default FindChar;