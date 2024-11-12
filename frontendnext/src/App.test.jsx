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
} from '@testing-library/react';

//Placeholder test suite
describe('something truthy and falsy', () => {
    it('true to be true', () => {
        expect(true).toBe(true);
    });
    it('false to be false', () => {
        expect(false).toBe(false);
    });
});

// Test footer
describe('Footer', () => {
    it('renders all properties', () => {
        render(<Footer />);
        expect(screen.getByText('A Next/Django Demo App.')).toBeInTheDocument();
        expect(screen.getByText('© 2024 Richard Shea. All rights reserved.')).toBeInTheDocument();
    });
});
// Test Navbar
describe('Navbar', () => {
    it('renders all properties', () => {
        render(<Navbar />);
        expect(screen.getByText('Next/Django Demo')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('My Todos')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });
});
// Test DeleteIconAndConfirmation
describe('DeleteIconAndConfirmation', () => {
    it('renders all properties', () => {
        render(<DeleteIconAndConfirmation />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
})
// Test ToggleCompletedIconAndConfirmation
// TBD: This test needs extending to render the component in both states.
// this may be useful for guidance on doing that 
// https://stackoverflow.com/questions/53119123/react-testing-library-test-styles-specifically-background-image
describe('ToggleCompletedIconAndConfirmation', () => {
    it('renders all properties', () => {
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
describe.skip('ToDoList - soon to be redundant 2', () => {
    test("renders table rows based on passed collection", () => {
        render(<ToDoList
        data={mockTodoData} 
        key={mockTodoData.length} 
        handleDeleteTodo={mockFunctionOne}
        handleToggleCompletion={mockFunctionTwo}
        logtestfunction={mockFunctionThree} />);

        // Check if each row is rendered with the correct data
        console.log("XXX-A")
        screen.debug()
        console.log("XXX-B")
        mockTodoData.forEach((item) => {
        //let todo_describer = `{item.title} ({item.id})`
        //let flexiblePattern = todo_describer.replace(/\s+/g, "\\s*");
        //expect(screen.getByText(new RegExp(flexiblePattern, "i"))).toBeInTheDocument(); 
        let lv = `${item.title} (${item.id})`
        /*
        let test_var = `foo`
        let test_string_var = `--- ${test_var} ---`
        */
        let tidied_up_td_value= item.title.replace(/\s+/g, ' ').trim();
            console.log("XXX-C")
        console.log(lv)
            console.log("XXX-D")
        //console.log(test_var)
            console.log("XXX-E")
        //console.log(test_string_var)
            console.log("XXX-F")
        console.log(tidied_up_td_value)
            console.log("XXX-G")
        expect(
            screen.getByText((lv) => {
            //Normalize whitespace in `text` to make matching more reliable
            const normalizedText = item.title.replace(/\s+/g, ' ').trim();
            return normalizedText.includes(lv);
            })
            ).toBeInTheDocument();
        });
    });
})

describe('ToDoList - soon to be redundant 4', () => {
    test('renders table cells containing each "foo" attribute from mockTodoData', () => {
        render(<ToDoList
          data={mockTodoData} 
          key={mockTodoData.length} 
            handleDeleteTodo={mockFunctionOne}
            handleToggleCompletion={mockFunctionTwo}
            logtestfunction={mockFunctionThree} />);
        // Iterate over each item in mockTodoData
        mockTodoData.forEach((item) => {
            // Define a multi-line function to match the cell content
            const matchText = (content) => {
                // Remove extra spaces and match against the item’s foo attribute
                const normalizedContent = content.replace(/\s+/g, ' ').trim();
                return normalizedContent.includes(item.title);
            };

            // Use screen.getByText with the function to verify the presence of each cell
            expect(screen.getByText(matchText)).toBeInTheDocument();
        });
    });
});


