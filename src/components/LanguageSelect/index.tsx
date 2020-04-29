import React from 'react';
import { useLanguage } from '../../hooks/language';

import { Container } from './styles';

const LanguageSelect: React.FC = () => {
  const { locale, selectLang } = useLanguage();

  return (
    <Container value={locale} onChange={selectLang}>
      <option value="en-US">English</option>
      <option value="es-MX">Espanol</option>
      <option value="pt-BR">Português</option>
    </Container>
  );
};

export default LanguageSelect;
