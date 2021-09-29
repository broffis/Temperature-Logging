import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { QueryResult } from '../components/QueryResult';
import Fridges from '../components/Fridges';

export const GET_ALL_FRIDGES = gql`
  query Fridges {
    fridges {
      _id
      name
      type
      location {
        location
      }
      tempLogs {
        temperature
        logTime
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_FRIDGES);
  return (
    <div>
      <QueryResult error={error} loading={loading} data={data}>
        <Fridges fridges={data?.fridges} />
      </QueryResult>
    </div>
  )
}

export default Home;
