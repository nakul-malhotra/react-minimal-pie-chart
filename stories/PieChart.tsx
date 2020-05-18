import React from 'react';
import { PieChart } from '../src';
import FullOption from '../stories-old/FullOption';
import { dataMock, defaultLabelStyle } from './common';

export default { title: 'Pie chart' };

export const fullOption = () => <FullOption data={dataMock} />;
export const basic = () => <PieChart data={dataMock} />;
export const customSize = () => (
  <PieChart data={dataMock} style={{ height: '100px' }} />
);
export const exploded = () => {
  const shiftSize = 7;
  return (
    <PieChart
      data={dataMock}
      radius={PieChart.defaultProps.radius - shiftSize}
      segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={{
        ...defaultLabelStyle,
      }}
    />
  );
};
