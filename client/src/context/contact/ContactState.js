import React, { useReducer } from 'react';
import uuid from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry Watson',
                email: 'harry@gmail.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);
    //Add contact
    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })

    }
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }
    //Delete contact

    //Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }
    //Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    }
    //Update contact
    const updateContact = (contact) =>{
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }
    //Filter contacts
    const filterContacts = text =>{
        dispatch({type: FILTER_CONTACTS, payload: text})
    }
    //Clear filter

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts

            }}>
            {props.children}
        </contactContext.Provider>
    )
};
export default ContactState; 