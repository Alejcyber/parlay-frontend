// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('jspdf', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      setFontSize: jest.fn(),
      text: jest.fn(),
      table: jest.fn(),
      save: jest.fn(),
      internal: {
        pageSize: {
          getWidth: jest.fn().mockReturnValue(210),
        },
      },
    })),
  }));

  const localStorageMock = (() => {
    let store = {
        games: JSON.stringify([{id:1, league: {id:1}, team_1:{name: 'Team A'}, team_2:{name: 'Team B'}}])
    };
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key) => {
        delete store[key];
      }
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });
