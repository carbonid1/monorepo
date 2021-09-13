
const Options = styled.ul`
  background-color: white;
  @media (prefers-color-scheme: dark) {
    background: var(--color-grey-7);
  }
`;

const Option = styled.li<{ active: boolean }>`
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
  color: var(--color-primary-6);
`;
