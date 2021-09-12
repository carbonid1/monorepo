import styled, { css } from 'styled-components';
import { Switch as SwitchImported } from '@headlessui/react';

const Root = styled.div`
  display: inline-flex;
  column-gap: 0.5rem; // 8px
  align-items: center;
  justify-content: space-between;
`;

const SwitchLabel = styled(SwitchImported.Label)`
  font-size: 0.875rem; // 14px
  line-height: 1.25rem; // 20px
  font-weight: var(--font-medium);
  cursor: pointer;
`;

const Switch = styled(SwitchImported)`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  height: 1.5rem; // 24px
  width: 2.75rem; // 44px
  border: 2px solid transparent;
  border-radius: 9999px;
  transition: background-color 0.2s ease-in-out;
  ${props => {
    if (props.checked) {
      return css`
        background: var(--color-primary-500);
      `;
    }
    return css`
      background: var(--color-grey-200);
      @media (prefers-color-scheme: dark) {
        background: var(--color-grey-700);
      }
    `;
  }};
`;

const Knob = styled.span<{ isChecked: boolean }>`
  pointer-events: none;
  display: inline-block;
  height: 1.25rem; // 20px
  width: 1.25rem; // 20px
  border-radius: 9999px;
  background: white;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transform: ${props => (props.isChecked ? 'translateX(1.25rem)' : 'translateX(0)')};
`;

const $ = {
  Root,
  SwitchLabel,
  Switch,
  Knob,
};

export default $;
