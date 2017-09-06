import tile from '../lib/tile.js';
import merge from 'ramda/src/merge';
import * as st from '../data/structure-textures.js';

// generators
export const generator = ({texture, position, data}) => {
  const d = merge({
    category: 'generator',
    power: [],
  }, data);
  return tile({texture, position, data: d});
};

export const diesel = ({position, data}) => {
  const texture = st.dieselGenerator;
  const d = merge({
    name: 'Diesel Generator',
    type: 'backup',
    priority: 0,
    capacity: 0,
    base: 0.2,
    ramp: 0.1,
    max: 200
  }, data);
  return generator({texture, position, data: d});
};

export const gas = ({position, data}) => {
  const texture = st.gasEngine;
  const d = merge({
    name: 'Gas Generator',
    type: 'base',
    priority: 1,
    capacity: 0,
    base: 0.2,
    ramp: 0.1,
    max: 200
  }, data);
  return generator({texture, position, data: d});
};

export const solar = ({position, data}) => {
  const texture = st.pvSolar;
  const d = merge({
    name: 'PV Solar',
    type: 'variable',
    priority: 2,
    variation: 'solar',
    ramp: 0.1,
    capacity: 0,
    max: 200,
    control: []
  }, data);
  return generator({texture, position, data: d});
};

export const wind = ({position, data}) => {
  const texture = st.windGen;
  const d = merge({
    name: 'Wind Generator',
    type: 'variable',
    priority: 2,
    variation: 'solar',
    capacity: 0,
    max: 200
  }, data);
  return generator({texture, position, data: d});
};

// battery
export const battery = ({position, data}) => {
  const texture = st.batteryContainer;
  const d = merge({
    category: 'battery',
    control: []
  }, data);
  return tile({texture, position, data: d});
};

// consumers
export const consumer = ({texture, position, data}) => {
  const d = merge({
    category: 'consumer',
    variation: 'defaultLoad',
    power: []
  }, data);
  return tile({texture, position, data: d});
};

export const houseThatched = ({position, data}) => {
  const texture = st.houseThatched;
  const d = merge({
    name: 'Thatched House',
    capacity: 0,
    max: 200
  }, data);
  return consumer({texture, position, data: d});
};

export const communityCenter = ({position, data}) => {
  const texture = st.communityCenter;
  const d = merge({
    name: 'Community Center',
    capacity: 0,
    max: 200
  }, data);
  return consumer({texture, position, data: d});
};

export const hospital = ({position, data}) => {
  const texture = st.hospital;
  const d = merge({
    name: 'Hospital',
    capacity: 0,
    max: 200
  }, data);
  return consumer({texture, position, data: d});
};


export const distributor = ({texture, position, data}) => {
  const d = merge({
    category: 'distributor'
  }, data);
  return tile({texture, position, data: d});
};

export const powerPole = ({position, data}) => {
  const texture = st.powerPole;
  const d = merge({
    name: 'Microgrid Network',
  }, data);
  return distributor({texture, position, data: d});
};

// other
export const other = ({texture, position, data}) => {
  const d = merge({
    category: 'other'
  }, data);
  return tile({texture, position, data: d});
};

export const farm = ({position, data}) => {
  const texture = st.farm;
  const d = merge({
    name: 'Farm',
  }, data);
  return other({texture, position, data: d});
};

export const terrain = ({texture, position, data}) => {
  const d = merge({
    category: 'terrain'
  }, data);
  return tile({texture, position, data: d});
};
