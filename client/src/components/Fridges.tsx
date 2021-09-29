import React from 'react';

import { FridgeProps } from '../assets/types';

import { formatDate } from '../assets/helpers/date-format';

import { FridgeCard } from './FridgeCard';


type FridgesProps = {
  fridges: FridgeProps[];
}

const Fridges = ({ fridges }: FridgesProps) => {
  return (
    <div>
      {
        fridges.map(fridge => {
          let sortedTempLogs = [...fridge.tempLogs];
            sortedTempLogs = sortedTempLogs.sort((a, b) => {
              if (a?.logTime > b?.logTime) return 1;
              if (a?.logTime < b?.logTime) return -1;
              return 0
            })
          let latestTemp;

          if (sortedTempLogs.length > 0) {
            const { logTime, temperature } = sortedTempLogs[sortedTempLogs.length -1 ];
            latestTemp = { logTime: formatDate(logTime), temperature }
            console.log(sortedTempLogs[sortedTempLogs.length -1 ])
          } else {
            latestTemp = { logTime: "" }
          }
          
          return (
            <FridgeCard key={fridge._id!} id={fridge._id!} name={fridge.name} location={fridge.location.location} latestTemp={latestTemp}/>
          )
        })
      }
    </div>
    )
}

export default Fridges;