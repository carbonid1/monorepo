import styled, { css } from 'styled-components';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0%;
`;

const Buttons = styled.div`
  display: grid;
  color: var(--color-grey-600);
  background: white;
  transition: transform 0.3s;
  padding: 1.5rem; // 24px
  gap: 1rem; // 16px
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem; // 12px

  &:focus-within {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-4px);
  }

  @media (prefers-color-scheme: dark) {
    background: var(--color-bg-dimmed);
    border: 1px solid var(--color-border-primary);
    color: white;

    &:focus-within {
      transform: none;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 20rem; // 320px
  padding: 1rem; // 16px
  font-size: 0.875rem; // 14px
  line-height: 1.25rem; // 20px
  font-weight: var(--font-medium);
  border-radius: 0.75rem; // 12px

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.xs}) {
      font-size: 1.25rem; // 20px
      line-height: 1.75rem; // 28px
    }
  `}

  svg {
    margin-right: 1rem; // 16px
    font-size: 1.25rem; // 20px
    line-height: 1.75rem; // 28px

    ${({ theme }) => css`
      @media (min-width: ${theme.breakpoints.xs}) {
        font-size: 1.875rem; // 30px
        line-height: 2.25rem; // 36px
      }
    `}
  }
`;

const $ = {
  Root,
  Buttons,
  Button,
};

export default $;
