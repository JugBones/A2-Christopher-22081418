import { useState } from 'react';

function NewContact(props) {
    const {contacts, setContacts} = props;
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');

    async function createContact(e) {
        e.preventDefault();

        console.log("Name:", name, "Address:", address); // Debug log

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address
            })
        });

        const data = await response.json();

        if (data.id) {
            setContacts([...contacts, data]);
        }

        setName('');
        setAddress('');
    }

	return (
        <form className='new-contact' onSubmit={createContact}>
            <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name}/>
            <input type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address}/>
            <button className='button green' type='submit'>Create Contact</button>
        </form>
	);
}

export default NewContact;