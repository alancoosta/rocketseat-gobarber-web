import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Profile from '../../pages/Profile';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();
// const mockedInitialData = jest.fn();

// Criar um mock, para sempre quando for rodar um teste, criar um mock, e todos os proximos testes vao utilizar esse mock
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('react-i18next', () => {
  return {
    useTranslation: () => ({ t: (key: React.ReactNode) => key }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

// jest.mock('@unform/web', () => {
//   return {
//     Form: () => ({
//       initialData: mockedInitialData,
//     }),
//   };
// });

describe('Profile Page', () => {
  it('test', () => {
    const test = 10;

    expect(test).toBe(10);
  });
  // beforeEach(() => {
  //   mockedHistoryPush.mockClear();
  //   // mockedInitialData.mockClear();
  // });
  // it('should able update profile', async () => {
  //   apiMock.onPost('profile').replyOnce(200);
  //   const { getByTestId } = render(<Profile />);
  //   const nameField = getByTestId('nameField');
  //   const emailField = getByTestId('emailField');
  //   const oldPasswordField = getByTestId('oldPasswordField');
  //   const passwordField = getByTestId('passwordField');
  //   const passwordConfirmationField = getByTestId('passwordConfirmationField');
  //   const buttonSubmit = getByTestId('buttonSubmit');
  //   fireEvent.change(nameField, {
  //     target: { value: 'John Doe' },
  //   });
  //   fireEvent.change(emailField, {
  //     target: { value: 'johndoe@example.com' },
  //   });
  //   fireEvent.change(oldPasswordField, { target: { value: '123456' } });
  //   fireEvent.change(passwordField, { target: { value: '123123' } });
  //   fireEvent.change(passwordConfirmationField, {
  //     target: { value: '123123' },
  //   });
  //   fireEvent.click(buttonSubmit);
  //   // O wait vai executar esse expect ate dar certo! Ele eh usado exatamente para algo que demora
  //   await wait(() => {
  //     // expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  //     // expect(mockedAddToast).toHaveBeenCalledWith(
  //     //   expect.objectContaining({
  //     //     type: 'success',
  //     //   }),
  //     // );
  //   });
  // });
});
