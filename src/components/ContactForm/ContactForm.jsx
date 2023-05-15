import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, LabelInput, Button } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operation';
import PropTypes from 'prop-types';
export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.items);

  const NameInputId = nanoid();
  const NumberInputId = nanoid();

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value.trim());
    } else if (name === 'number') {
      setNumber(value.trim());
    }
  };

  const handleSubmitContact = evt => {
    evt.preventDefault();

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      alert(`${name} is already used.`);
    else {
      dispatch(addContact({ name, number }));
    }

    resetNameInput();
  };

  function resetNameInput() {
    setName('');
    setNumber('');
  }

  return (
    <>
      <Form onSubmit={handleSubmitContact}>
        <LabelInput htmlFor={NameInputId}> Name </LabelInput>
        <input
          id={NameInputId}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <LabelInput htmlFor={NumberInputId}> Number </LabelInput>
        <input
          id={NumberInputId}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="[0-9\-]+"
          title="Number may contain only numbers."
          required
        />
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  contacts: PropTypes.array,
};
