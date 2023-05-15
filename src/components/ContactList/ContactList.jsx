import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from './ContactList.styled.js';

import PropTypes from 'prop-types';
import { deleteContact } from 'redux/operation.js';

export const ContactList = () => {
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  const createMarkupByFoundContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };
  return (
    <ul>
      {isLoading ? (
        <div>Need to wait...our slaves working on it</div>
      ) : (
        createMarkupByFoundContacts().map(contact => {
          return (
            <ContactItem key={contact.id}>
              {contact.name}: {contact.number}
              <button
                type="button"
                onClick={() => dispatch(deleteContact(contact.id))}
              >
                Delete
              </button>
            </ContactItem>
          );
        })
      )}
    </ul>
  );
};

ContactList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.array,
};
