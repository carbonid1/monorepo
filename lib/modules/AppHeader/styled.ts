import styled from 'styled-components';
import NextImg from 'next/image';
import { TextLink as TextLinkImported } from 'lib/components';

const Root = styled.div`
  background: var(--color-background);
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 4rem;
  z-index: 2;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 0%;
  max-width: 64rem;
  padding: 1rem; // 16px
  margin: 0 auto;
`;

const TextLink = styled(TextLinkImported)`
  --color-primary-500: var(--color-text);
  font-weight: var(--font-bold);
`;

const LogoLink = styled(TextLink)`
  margin-right: auto;
  font-size: 1.875rem; // 30px
  line-height: 2.25rem; // 36px
`;

const Img = styled(NextImg)`
  border-radius: 9999px;
`;

const SignInBtn = styled(TextLink)`
  margin-left: 1rem; // 16px
`;

const $ = {
  Root,
  Inner,
  LogoLink,
  Img,
  SignInBtn,
};

export default $;
