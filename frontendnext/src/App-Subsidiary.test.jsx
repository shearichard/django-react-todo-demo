//
// NOT CURRENTLY IN USE BUT LEFT HERE FOR REFRENCEN
// Based on 'Update 2' of https://stackoverflow.com/a/56859650/364088
//
import { render } from '@testing-library/react'
import ToDoList from "./app/components/ToDoList";
import withMarkup from './withMarkup'

const mockTodoData = [
    {
        "id": 101,
        "title": "Test 1",
        "description": "",
        "is_completed": true,
        "should_be_completed_by_date": "2024-11-17T11:28:54.222222Z"
    },
    {
        "id": 102,
        "title": "Test 2",
        "description": "",
        "is_completed": true,
        "should_be_completed_by_date": "2024-11-17T11:29:00.111111Z"
    },
    {
        "id": 103,
        "title": "Test 3",
        "description": "",
        "is_completed": true,
        "should_be_completed_by_date": "2024-11-18T00:20:00.000000Z"
    },

];
// Custom Wrapper using the DataContext
const DataProviderWrapper = ({ children }) => (
      <DataContext.Provider value={mockTodoData}>{children}</DataContext.Provider>
);
//
const mockFunctionOne = vi.fn();
const mockFunctionTwo = vi.fn();
const mockFunctionThree = vi.fn();

test.skip('tests foo and bar', () => {
  const { x } = render(<ToDoList
      data={mockTodoData} 
      key={mockTodoData.length} 
      handleDeleteTodo={mockFunctionOne}
      handleToggleCompletion={mockFunctionTwo}
      logtestfunction={mockFunctionThree} />);
  //
  const xWithMarkup = withMarkup(x)
  getByTextWithMarkup('Test 3 (103)')
  expect(screen.getByText(matchText)).toBeInTheDocument();
})
