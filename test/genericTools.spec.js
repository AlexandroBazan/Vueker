import {mount} from 'vue-test-utils';
import tools from '../src/utils/genericTools.js';
import expect from 'expect';

var moment = require('moment');

describe('tools', () => {
  tools.presets.format = 'DD/MM/YYYY'; 

  it('check create moment date', () => {
    let date = '11/09/2017';

    expect(tools.createMomentDate(date).format()).toBe(moment(date, tools.presets.format).format());

    date = new Date(2017,9,11);

    expect(tools.createMomentDate(date).format()).toBe(moment(date).format());

    date = moment();
    
    expect(tools.createMomentDate(date).format()).toBe(date.format());
  });
});