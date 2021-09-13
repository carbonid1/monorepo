import styled from 'styled-components';
import { CollectionIcon as CollectionIconImported } from '@heroicons/react/solid';

const CollectionIcon = styled(CollectionIconImported)`
  height: 10rem; // 160px
  color: var(--color-primary-3);
`;

const $ = {
  CollectionIcon,
};

export default $;
