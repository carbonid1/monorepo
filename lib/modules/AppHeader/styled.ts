import styled from 'styled-components';
import { TextLink as TextLinkImported } from 'lib/components';

const TextLink = styled(TextLinkImported)`
  --color-primary: white;
`;

const $ = {
  TextLink,
};

export default $;
