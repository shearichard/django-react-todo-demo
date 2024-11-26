import Footer from "./app/components/Footer";
import Navbar from "./app/components/Navbar";
import DeleteIconAndConfirmation from "./app/components/DeleteIconAndConfirmation";
import ToDoList from "./app/components/ToDoList";
import ToggleCompletedIconAndConfirmation from "./app/components/ToggleCompletedIconAndConfirmation";
import { DataContext } from "./app/components/DataProvider";

import { describe, it, expect } from 'vitest';

import {
render,
screen,
fireEvent,
waitFor,
within,
} from '@testing-library/react';

// Test Navbar
describe('Navbar', () => {
    it('displays app title and navigational elements correctly', () => {
        render(<Navbar />);
        expect(screen.getByText('Next/Django Demo')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('My Todos')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });
});
// Test footer
describe('Footer', () => {
    it('displays app name and copyright correctly', () => {
        render(<Footer />);
        expect(screen.getByText('A Next/Django Demo App.')).toBeInTheDocument();
        expect(screen.getByText('© 2024 Richard Shea. All rights reserved.')).toBeInTheDocument();
    });
});
// Test DeleteIconAndConfirmation
describe('DeleteIconAndConfirmation', () => {
    it('that the component renders a button', () => {
        render(<DeleteIconAndConfirmation />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
})
// Test ToggleCompletedIconAndConfirmation
// TBD: This test needs extending to render the component in both states.
// this may be useful for guidance on doing that 
// https://stackoverflow.com/questions/53119123/react-testing-library-test-styles-specifically-background-image
describe('ToggleCompletedIconAndConfirmation', () => {
    it('that the component renders a button', () => {
        render(<ToggleCompletedIconAndConfirmation />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
})
// Test ToDoList
// Mock Data and Functions
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
//
describe('ToDoList', () => {
  test.skip("that the three 'task' descriptions (with embedded id) are contained in the output", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    expect(screen.getByText('Test 1 (id=101)')).toBeInTheDocument();
    expect(screen.getByText('Test 2 (id=102)')).toBeInTheDocument();
    expect(screen.getByText('Test 3 (id=103)')).toBeInTheDocument();
  });
  test("that the three 'task' descriptions are contained in the output", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Test 3')).toBeInTheDocument();
  });
  test.skip("that the three 'task' descriptions (with embedded id) are contained in the output (alternative approach)", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    //
    mockTodoData.forEach((item) => {
      let td_contents = `${item.title} (id=${item.id})`
      expect(screen.getByText(td_contents)).toBeInTheDocument();
    });
  });
  test("that the three 'task' descriptions are contained in the output (alternative approach)", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    //
    mockTodoData.forEach((item) => {
      let td_contents = `${item.title}`
      expect(screen.getByText(td_contents)).toBeInTheDocument();
    });
  });
  test.skip("that each row of the table has the expected 'task' description (with embedded id)", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    //
    mockTodoData.forEach((item) => {
      let test_id = `row-${item.id}`
      let td_contents = `${item.title} (id=${item.id})`
	    // Get the row related to the current 'mockTodoData' element 
      const row = screen.getByTestId(test_id);
	    // Get a Utility object within methods scoped to the row DOM element 
      const utils = within(row)
	    // Look for the 'Task' values expected for the current 'mockTodoData' element 
      expect(screen.getByText(td_contents)).toBeInTheDocument();
    });
  });
  test("that each row of the table has the expected 'task' description", () => {
    render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);
    //
    mockTodoData.forEach((item) => {
      let test_id = `row-${item.id}`
      let td_contents = `${item.title}`
	    // Get the row related to the current 'mockTodoData' element 
      const row = screen.getByTestId(test_id);
	    // Get a Utility object within methods scoped to the row DOM element 
      const utils = within(row)
	    // Look for the 'Task' values expected for the current 'mockTodoData' element 
      expect(screen.getByText(td_contents)).toBeInTheDocument();
    });
  });
});
////Placeholder test suite
//describe.skip('something truthy and falsy', () => {
//    it.skip('true to be true', () => {
//        expect(true).toBe(true);
//    });
//    it.skip('false to be false', () => {
//        expect(false).toBe(false);
//    });
//});

