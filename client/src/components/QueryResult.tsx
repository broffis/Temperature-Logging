import React from 'react';

type ResultProps = {
  loading: boolean;
  error: any;
  data: any;
  children: any;
}

export const QueryResult = ({ loading, error, data, children }: ResultProps) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading</p>
  }

  if (!data) {
    return <p>Nothing to show...</p>;
  }

  if (data) {
    return children;
  }
}
