import styled from 'styled-components';

const ButtonBase = styled.button`
  color: var(--color-primary-5);
  box-shadow: 0 0 0 var(--color-primary-5);
  transition: box-shadow 400ms;

  &:hover {
    box-shadow: 0 2px 0 var(--color-primary-5);
    transition-duration: 100ms;
  }
`;

const Button = styled(ButtonBase)`
  line-height: 1.25rem;
`;

const AnchorButton = styled(ButtonBase)`
  cursor: pointer;
`;

const $ = {
  Button,
  AnchorButton,
};

export default $;
