import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
}
  from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';


const APMChart = ({ players }) => {
  const actionData = [];
  const bars = [];
  let first = true;
  Object.values(players).forEach((p) => {
    if (first) {
      first = false;
      p.actions.timed.forEach((action, index) => {
        const obj = {};
        Object.values(players).forEach((pl) => {
          obj[pl.name] = pl.actions.timed[index];
        });
        obj.name = index.toString();
        actionData.push(obj);
      });
    }


    bars.push(<Line dataKey={p.name} stroke={p.color} />);
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={actionData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {bars}
      </LineChart>
    </ResponsiveContainer>
  );
};

APMChart.propTypes = {
  players: PropTypes.object,
};

export default APMChart;
