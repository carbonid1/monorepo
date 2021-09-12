import styled, { css } from 'styled-components';

const InnerWrapper = styled.div`
  width: 13rem; // 208px
  position: relative;
`;

const Button = styled.button`
  position: relative;
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem; // 8px 40px 8px 12px
  text-align: left;
  background-color: white;
  border-radius: 0.5rem /* 8px */;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: default;
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-700);
  }
`;

const Option = styled.li<{ active: boolean }>`
  cursor: default;
  user-select: none;
  position: relative;
  padding: 0.5rem 1rem 0.5rem 2.5rem; // 8px 16px 8px 40px
  ${props => {
    if (props.active)
      return css`
        color: var(--color-primary-500);
        background: var(--color-primary-100);
      `;
    return css`
      color: var(--color-grey-900);
    `;
  }}
`;

const $ = {
  InnerWrapper,
  Button,
  Option,
};

export default $;
