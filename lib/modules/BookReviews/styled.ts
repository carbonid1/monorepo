import styled from 'styled-components';
import { LoadingContent as LoadingContentImported } from 'lib/components';

const Filters = styled.div`
  display: flex;
  column-gap: 1rem; // 16px
`;

const LoadingContent = styled(LoadingContentImported)`
  margin-top: 1.5rem; // 24px
`;

const ReviewsWrapper = styled.div`
  display: grid;
  gap: 1rem; // 16px
  grid-auto-rows: max-content;
`;

const $ = {
  Filters,
  LoadingContent,
  ReviewsWrapper,
};

export default $;
