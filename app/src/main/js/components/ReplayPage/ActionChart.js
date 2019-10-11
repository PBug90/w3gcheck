import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
}
  from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';

const ActionChart = ({ players }) => {
  let actionData = {};
  const bars = [];
  Object.values(players).forEach((p) => {
    Object.keys(p.actions).forEach((k) => {
      if (k === 'timed') return;
      actionData[k] = actionData[k] || {};
      actionData[k][p.name] = p.actions[k];
    });
    bars.push(<Bar dataKey={p.name} fill={p.color} />);
  });
  actionData = Object.keys(actionData).map((key) => ({ name: key, ...actionData[key] }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={actionData}
        margin={
        {
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }
      }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars}
      </BarChart>
    </ResponsiveContainer>
  );
};

ActionChart.propTypes = {
  players: PropTypes.object,
};

export default ActionChart;
