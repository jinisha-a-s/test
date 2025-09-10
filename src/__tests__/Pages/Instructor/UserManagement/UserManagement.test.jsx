
// src/__tests__/Pages/UserManagement.test.jsx

import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UserManagement from "../../../../pages/Instructor/UserManagement/UserManagement.jsx";
import { MemoryRouter } from "react-router-dom";
import Spinner from "../../../../components/Spinner.jsx";
import { vi } from "vitest";

// ✅ Mock the slice properly
vi.mock("../../../../features/Instructor/UserManagement/allUserSlice", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        default: (state = { list: [], loading: false, error: null }, action) => state,
        fetchUsers: vi.fn(() => ({ type: "FETCH_USERS_TEST" })),
    };
});

// ✅ Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("UserManagement Page - All Tests", () => {
    let store;

    const sampleStudents = [
        { id: 1, name: "Alice", email: "alice@example.com", course: "Math", status: "Ongoing", created_at: "2025-09-01" },
        { id: 2, name: "Bob", email: "bob@example.com", course: "Science", status: "Finished", created_at: "2025-09-02" },
        { id: 3, name: "Charlie", email: "charlie@example.com", course: "Math", status: "Newly Registered", created_at: "2025-09-03" },
    ];

    const renderUserManagement = (preloadedState = {}) => {
        store = configureStore({
            reducer: {
                users: (state = { list: [], loading: false, error: null }, action) => state,
            },
            preloadedState: { users: { list: [], loading: false, error: null, ...preloadedState } },
        });

        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserManagement />
                </MemoryRouter>
            </Provider>
        );
    };

    // -----------------------------
    // Existing tests: render, loading, error, empty
    // -----------------------------
    test("renders navbar and table headers", () => {
        renderUserManagement();
        expect(screen.getByTestId("instructor-navbar")).toBeInTheDocument();
        const headers = ["ID", "Name", "Email", "Course", "Registered On", "Status", "Actions"];
        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    test("shows spinner when loading", () => {
        renderUserManagement({ loading: true });
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    test("shows error message when error exists", () => {
        renderUserManagement({ error: "Failed to fetch students" });
        expect(screen.getByText("Failed to fetch students")).toBeInTheDocument();
    });

    test("shows 'No students found' when student list is empty", () => {
        renderUserManagement({ list: [] });
        expect(screen.getByText("No students found.")).toBeInTheDocument();
    });

    // -----------------------------
    // Filter & Search tests
    // -----------------------------
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        mockNavigate.mockClear(); // Reset navigate mock after each test
    });

    test("filters by status", () => {
        renderUserManagement({ list: sampleStudents });
        const filterSelect = screen.getByTestId("filter-select");

        fireEvent.change(filterSelect, { target: { value: "Finished" } });

        expect(screen.queryByTestId("student-name-1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("student-name-2")).toBeInTheDocument();
        expect(screen.queryByTestId("student-name-3")).not.toBeInTheDocument();
    });

    test("search by name with debounce", () => {
        renderUserManagement({ list: sampleStudents });
        const searchInput = screen.getByTestId("search-input");

        act(() => {
            fireEvent.change(searchInput, { target: { value: "alice" } });
            vi.advanceTimersByTime(300);
        });

        expect(screen.queryByTestId("student-name-1")).toBeInTheDocument();
        expect(screen.queryByTestId("student-name-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("student-name-3")).not.toBeInTheDocument();
    });

    // -----------------------------
    // Student rows rendering and data tests
    // -----------------------------
    test("renders all student rows with correct data", () => {
        renderUserManagement({ list: sampleStudents });

        sampleStudents.forEach((student) => {
            expect(screen.getByTestId(`student-id-${student.id}`)).toHaveTextContent(String(student.id));
            expect(screen.getByTestId(`student-name-${student.id}`)).toHaveTextContent(student.name);
            expect(screen.getByTestId(`student-email-${student.id}`)).toHaveTextContent(student.email);
            expect(screen.getByTestId(`student-course-${student.id}`)).toHaveTextContent(student.course);
            expect(screen.getByTestId(`student-date-${student.id}`)).toHaveTextContent(
                new Date(student.created_at).toLocaleDateString()
            );
            expect(screen.getByTestId(`student-status-${student.id}`)).toHaveTextContent(student.status);
            expect(screen.getByTestId(`view-button-${student.id}`)).toBeInTheDocument();
        });
    });

    test("combined filter and search", () => {
        renderUserManagement({ list: sampleStudents });
        const filterSelect = screen.getByTestId("filter-select");
        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(filterSelect, { target: { value: "Ongoing" } });

        act(() => {
            fireEvent.change(searchInput, { target: { value: "Alice" } });
            vi.advanceTimersByTime(300);
        });

        expect(screen.queryByTestId("student-name-1")).toBeInTheDocument();
        expect(screen.queryByTestId("student-name-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("student-name-3")).not.toBeInTheDocument();
    });

    // -----------------------------
    // Navigation Test: Clicking "View" button
    // -----------------------------
    test("navigates to student detail page when 'View' button is clicked", () => {
        renderUserManagement({ list: sampleStudents });

        const viewButton = screen.getByTestId("view-button-2");
        fireEvent.click(viewButton);

        expect(mockNavigate).toHaveBeenCalledWith("/instructor/user-management/2");
    });
});
