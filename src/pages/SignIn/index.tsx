import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LanguageSelect from '../../components/LanguageSelect';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false, // Para nao parar no primeiro erro
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // Depois de ser autenticado, vai ser enviado a rota de dashboard
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // Disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>
              <FormattedMessage
                id="signin.header"
                defaultMessage="Make your Logon"
              />
            </h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <FormattedMessage
              id="signin.inputPlaceholderPassword"
              defaultMessage="Password"
            >
              {(placeholder: string) => (
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>

            <Button type="submit">
              <FormattedMessage
                id="signin.buttonSingIn"
                defaultMessage="Sign In"
              />
            </Button>

            <a href="forgot">
              <FormattedMessage
                id="signin.forgetPassword"
                defaultMessage="I my forgot my password"
              />
            </a>
          </Form>

          <Link to="/signup">
            <FiLogIn />

            <FormattedMessage
              id="signin.createAccount"
              defaultMessage="Create an account"
            />
          </Link>

          <LanguageSelect />
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
