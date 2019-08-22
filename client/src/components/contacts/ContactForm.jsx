import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });
    const contactContext = useContext(ContactContext);
    const { current, clearCurrent, updateContact, addContact} = contactContext;
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])
    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        
    }
    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
        else{
            updateContact(contact); 
        }
    }
    const clearAll = () => {
        clearCurrent();
    }
    const { name, email, phone, type } = contact;
    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primry'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type="email" placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <input type="radio" name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
            Personal{' '}
            <input type="radio" name='type' value='professional' checked={type === 'professional'} onChange={onChange} />
            Professional{' '}
            <input className='btn btn-primry btn-block' type="submit" value={current ? 'Update' : 'Add'} />
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm;