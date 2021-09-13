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
  border-radius: 0.5rem; // 8px
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: default;
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-grey-7);
  }
`;

const Options = styled.ul`
  position: absolute;
  width: 100%;
  padding-top: 0.25rem; // 4px
  padding-bottom: 0.25rem; // 4px
  margin-top: 0.25rem; // 4px
  overflow: auto;
  font-size: 1rem; // 16px
  line-height: 1.5rem; // 24px
  background-color: white;
  border-radius: 0.375rem; // 6px
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 15rem; // 240px
  @media (prefers-color-scheme: dark) {
    background: var(--color-grey-7);
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
        color: var(--color-primary-5);
        background: var(--color-primary-1);
      `;
    return css`
      color: var(--color-grey-9);
      @media (prefers-color-scheme: dark) {
        color: white;
      }
    `;
  }}
`;

const CheckIconBlock = styled.span`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  padding-left: 0.75rem; // 12px
  color: var(--color-primary-6);
`;

const $ = {
  InnerWrapper,
  Button,
  Options,
  Option,
  CheckIconBlock,
};

export default $;
