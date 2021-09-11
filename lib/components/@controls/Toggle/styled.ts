import styled from 'styled-components';
import { Switch } from '@headlessui/react';

const Root = styled.div`
  display: inline-flex;
  column-gap: 0.5rem; // 8px
  align-items: center;
  justify-content: space-between;
`;

const SwitchLabel = styled(Switch.Label)`
  font-size: 0.875rem; // 14px
  line-height: 1.25rem; // 20px
  font-weight: var(--font-medium);
  cursor: pointer;
`;

const $ = {
  Root,
  SwitchLabel,
};

export default $;
