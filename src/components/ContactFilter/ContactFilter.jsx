import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/filterSlice';
import PropTypes from 'prop-types';
export const ContactFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={e => dispatch(filterContacts(e.currentTarget.value))}
    />
  );
};

ContactFilter.propTypes = {
  filter: PropTypes.string,
};
