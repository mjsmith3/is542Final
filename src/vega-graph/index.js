import React from 'react';
import './index.css';
import { generateStackedBarChart } from './generateSpec';
import {Vega} from 'react-vega'

export const VegaGraph = (props) => {
    return (
      <Vega spec={generateStackedBarChart(props.data, props.height, props.width, props.color)} />
    );
};
