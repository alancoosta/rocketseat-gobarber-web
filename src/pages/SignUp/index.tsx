import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LanguageSelect from '../../components/LanguageSelect';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false, // Para nao parar no primeiro erro
        });

        // Fazer o cadastro do usuario
        await api.post('/users', data);

        history.push('/');

        // Colocar o toast de sucesso
        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Voce ja pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // Disparar um toast
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>
              <FormattedMessage
                id="signup.header"
                defaultMessage="Make your registration"
              />
            </h1>

            <FormattedMessage
              id="signup.inputPlaceholderName"
              defaultMessage="Name"
            >
              {(placeholder: string) => (
                <Input name="name" icon={FiUser} placeholder={placeholder} />
              )}
            </FormattedMessage>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <FormattedMessage
              id="signup.inputPlaceholderPassword"
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
                id="signup.buttonSignUp"
                defaultMessage="Register"
              />
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>

          <LanguageSelect />
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
