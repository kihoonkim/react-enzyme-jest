import React from 'react';
import { shallow } from 'enzyme';
import LogTable from '../../components/LogTable';
import useUserContext from '../../hooks/useUserContext';
import ContentLoading from '../../components/loading/ContentLoading';
import Table from '../../components/table/Table';
import TableRow from '../../components/table/TableRow';

jest.mock('../../hooks/useUserContext');

describe('LogTable test', () => {
  const getUsersFromAPIMock = jest.fn();
  const deleteUserFromApiMock = jest.fn();
  const useUserContextReturnValue = {
    loading: true,
    users: [],
    getUsersFromAPI: getUsersFromAPIMock,
    deleteUserFromApi: deleteUserFromApiMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUsersFromAPIMock on mount', () => {
    useUserContext.mockReturnValue({ ...useUserContextReturnValue });
    shallow(<LogTable />);

    expect(getUsersFromAPIMock).toHaveBeenCalled();
  });

  test('show ContentLoading on loading', () => {
    useUserContext.mockReturnValue({ ...useUserContextReturnValue });
    const wrapper = shallow(<LogTable />);

    expect(wrapper.find(ContentLoading).exists()).toBeTruthy();
    expect(wrapper.find(Table).exists()).toBeFalsy();
  });

  test('show Table on loaded', () => {
    useUserContext.mockReturnValue({ ...useUserContextReturnValue, loading: false });
    const wrapper = shallow(<LogTable />);

    expect(wrapper.find(Table).exists()).toBeTruthy();
    expect(wrapper.find(ContentLoading).exists()).toBeFalsy();
  });

  test('TableHeader', () => {
    useUserContext.mockReturnValue({ ...useUserContextReturnValue, loading: false });
    const wrapper = shallow(<LogTable />);

    const tableHeaderRow = wrapper.find(TableRow).at(0);

    expect(tableHeaderRow.childAt(0).children().text()).toBe('#');
    expect(tableHeaderRow.childAt(1).children().text()).toBe('Name');
    expect(tableHeaderRow.childAt(2).children().text()).toBe('Action');
  });

  test('TableBody', () => {
    const users = [{ id: 'user-1', name: 'test user 1' }];
    useUserContext.mockReturnValue({ ...useUserContextReturnValue, loading: false, users });

    const wrapper = shallow(<LogTable />);

    const tableBodyUserRow = wrapper.find(TableRow).at(1);
    expect(tableBodyUserRow.childAt(0).children().text()).toBe('1');
    expect(tableBodyUserRow.childAt(1).children().text()).toBe('test user 1');
    expect(tableBodyUserRow.childAt(2).children().filter('button').exists()).toBeTruthy();
  });

  test('delete button clicked', () => {
    const users = [{ id: 'user-1', name: 'test user 1' }];
    useUserContext.mockReturnValue({ ...useUserContextReturnValue, loading: false, users });

    const wrapper = shallow(<LogTable />);
    const deleteButton = wrapper.find(TableRow).at(1).childAt(2).children().filter('button');

    deleteButton.simulate('click');

    expect(deleteUserFromApiMock).toHaveBeenCalledWith('user-1');
  });
});
