import { AppWrapper } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import { fetchAll } from 'redux/operation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(fetchAll());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <AppWrapper>
      <h2>Phonebook</h2>
      <ContactForm />
      <h3>Contacts</h3>
      <ContactFilter />
      <ContactList />
    </AppWrapper>
  );
};
