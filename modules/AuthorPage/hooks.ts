import { AuthorPage_AuthorQueryVariables, useAuthorPage_AuthorQuery } from 'generated/graphql';

const useAuthorQuery = (id: AuthorPage_AuthorQueryVariables['id']) =>
  useAuthorPage_AuthorQuery({
    variables: { id },
    skip: !id,
  });

const hooks = {
  useAuthorQuery,
};

export default hooks;
