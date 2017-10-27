import {mount} from 'vue-test-utils';
import visibleDates from '../src/utils/visibleDates.js';
import expect from 'expect';
import tools from '../src/utils/genericTools.js';

var moment = require('moment');

describe('Visible Dates by weekdays', () => {
  let format = 'DD/MM/YYYY';

  tools.presets.format = format; 

  it('returns expected weekday indexes', () => {
    expect(visibleDates.getWeekdayIndex('sunday')).toBe(0);
    expect(visibleDates.getWeekdayIndex('monday')).toBe(1);
    expect(visibleDates.getWeekdayIndex('tuesday')).toBe(2);
    expect(visibleDates.getWeekdayIndex('wednesday')).toBe(3);
    expect(visibleDates.getWeekdayIndex('thursday')).toBe(4);
    expect(visibleDates.getWeekdayIndex('friday')).toBe(5);
    expect(visibleDates.getWeekdayIndex('saturday')).toBe(6);
  });

  it('check if weekday validation returns true', () => {
    expect(visibleDates.weekdayParamFilter('saturday')).toBe(true);
  });

  it('check if weekday validation returns false', () => {
    expect(visibleDates.weekdayParamFilter()).toBe(false);

    expect(visibleDates.weekdayParamFilter({a:0})).toBe(false);

    expect(visibleDates.weekdayParamFilter([0,1,2,3,4,5])).toBe(false);

    expect(visibleDates.weekdayParamFilter(moment())).toBe(false);
    
    expect(visibleDates.weekdayParamFilter('abcdsfdkjs')).toBe(false);
    
  });

  it('returns the expected weekday when comparing', () => {
    let date = moment('01/10/2017', format);

    expect(visibleDates.compareWeekdays(date, 'sunday')).toBe(true);

    date = moment('02/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'monday')).toBe(true);

    date = moment('03/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'tuesday')).toBe(true);

    date = moment('04/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'wednesday')).toBe(true);

    date = moment('05/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'thursday')).toBe(true);

    date = moment('06/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'friday')).toBe(true);

    date = moment('07/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'saturday')).toBe(true);
  });

  it('does not return the expected weekday when comparing', () => {
    let date = moment('02/10/2017', format);
    
    expect(visibleDates.compareWeekdays(date, 'sunday')).toBe(false);

    expect(visibleDates.compareWeekdays(date)).toBe(false);

    expect(visibleDates.compareWeekdays(date, {a:0})).toBe(false);

    expect(visibleDates.compareWeekdays(date, 'asdasdasda')).toBe(false);

    expect(visibleDates.compareWeekdays(date, [0,1,2,3,4,5,6,7,8,9,10])).toBe(false);
  });

  it('returns the expected weekdays when comparing', () => {
    let date = moment('02/10/2017', format);

    let weekdays = ['monday','friday','saturday'];
    
    expect(visibleDates.itsInWeekdays(date, weekdays)).toBe(true);

    date = moment('06/10/2017', format);

    expect(visibleDates.itsInWeekdays(date, weekdays)).toBe(true);

    date = moment('07/10/2017', format);
    
    expect(visibleDates.itsInWeekdays(date, weekdays)).toBe(true);
  });

  it('does not return the expected weekdays when comparing', () => {
    let date = moment('01/10/2017', format);
    
    let weekdays = ['monday','friday','saturday'];
    
    expect(visibleDates.itsInWeekdays(date, weekdays)).toBe(false);

    expect(visibleDates.itsInWeekdays(date, 'monday')).toBe(false);

    expect(visibleDates.itsInWeekdays(date, {a:0})).toBe(false);

    expect(visibleDates.itsInWeekdays(date)).toBe(false);
    
  });
});

describe('Visible Dates by date list', () => {
  let format = 'DD/MM/YYYY';

  tools.presets.format = format; 

  it('verify that the day is in the list', () => {
    let dates = [
      '10/03/2017',
      '05/07/2017',
      '15/09/2015',
      '30/11/2017',
      '25/02/2002',
    ];

    let date = moment(dates[0],format);

    expect(visibleDates.itsInDates(date, dates)).toBe(true);

    date = moment(dates[1],format);
    
    expect(visibleDates.itsInDates(date, dates)).toBe(true);

    date = moment(dates[2],format);
    
    expect(visibleDates.itsInDates(date, dates)).toBe(true);

    date = moment(dates[3],format);
    
    expect(visibleDates.itsInDates(date, dates)).toBe(true);

    date = moment(dates[4],format);
    
    expect(visibleDates.itsInDates(date, dates)).toBe(true);
  });

  it('verify that the day is not on the list', () => {
    let dates = [
      '10/03/2017',
      '05/07/2017',
      '15/09/2015',
      '30/11/2017',
      '25/02/2002',
    ];

    let date = moment('11/03/2017',format);

    expect(visibleDates.itsInDates(date, dates)).toBe(false);
  });
});

describe('Visible Dates by ranges', () => {
  let format = 'DD/MM/YYYY';

  tools.presets.format = format; 

  it('check if the day is within the minimum', () => {
    let date = moment('14/11/2017',format);
    let min = moment('13/11/2017',format);

    expect(visibleDates.withinMin(date, min)).toBe(true);

    date = moment('13/11/2017',format);

    expect(visibleDates.withinMin(date, min)).toBe(true);
  });

  it('check if the day is without the minimum', () => {
    let date = moment('12/11/2017',format);
    let min = moment('13/11/2017',format);

    expect(visibleDates.withinMin(date, min)).toBe(false);
  });

  it('check if the day is within the maximun', () => {
    let date = moment('14/11/2017',format);
    let max = moment('20/11/2017',format);

    expect(visibleDates.withinMax(date, max)).toBe(true);

    date = moment('20/11/2017',format);

    expect(visibleDates.withinMax(date, max)).toBe(true);
  });

  it('check if the day is without the maximun', () => {
    let date = moment('21/11/2017',format);
    let max = moment('20/11/2017',format);

    expect(visibleDates.withinMax(date, max)).toBe(false);
  });

  it('check if the day is within the range', () => {
    let range = {from: '05/11/2017', to:'15/11/2017'};
    
    let date = moment('10/11/2017', format);
    
    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(true);

    date = moment('05/11/2017', format);
    
    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(true);

    date = moment('15/11/2017', format);

    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(true);
  });

  it('check if the day is without the range', () => {
    let range = {from: '05/11/2017', to:'15/11/2017'};
    
    let date = moment('01/11/2017', format);
    
    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(false);

    date = moment('20/11/2017', format);
    
    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(false);

    date = moment('04/11/2017', format);

    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(false);

    date = moment('16/11/2017', format);
    
    expect(visibleDates.itsInDateRange(date, moment(range.from, format), moment(range.to, format))).toBe(false);
  });
  
  it('pass the range filter', () => {
    let range = {from: '05/11/2017', to:'15/11/2017'};

    let date = moment('10/11/2017', format);

    expect(visibleDates.validateRange(date, range)).toBe(true);
    
    date = moment('05/11/2017', format);
    
    expect(visibleDates.validateRange(date, range)).toBe(true);

    date = moment('15/11/2017', format);
    
    expect(visibleDates.validateRange(date, range)).toBe(true);
  });

  it('does not pass the range filter', () => {
    let range = {from: '05/11/2017', to:'15/11/2017'};
    
    let date = moment('04/11/2017', format);

    expect(visibleDates.validateRange(date, range)).toBe(false);
    
    date = moment('16/11/2017', format);
    
    expect(visibleDates.validateRange(date, range)).toBe(false);

    date = moment('20/11/2017', format);
    
    expect(visibleDates.validateRange(date, range)).toBe(false);

    date = moment('01/11/2017', format);
    
    expect(visibleDates.validateRange(date, range)).toBe(false);
  });

  it('check if the day is within the ranges', () => {
    let ranges = [
      {from: '01/01/2017', to:'20/02/2017'},
      {from: '05/11/2017', to:'15/12/2017'},
      {from: '03/08/2017', to:'28/08/2017'},
      {from: '05/05/2017', to:'23/06/2017'},
    ];
    
    let date = moment('01/01/2017', format);

    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);

    date = moment('20/02/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);

    date = moment('03/08/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);

    date = moment('28/08/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);

    date = moment('27/11/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);

    date = moment('27/11/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(true);
  });

  it('check if the day is without the ranges', () => {
    let ranges = [
      {from: '01/01/2017', to:'20/02/2017'},
      {from: '05/11/2017', to:'15/12/2017'},
      {from: '03/08/2017', to:'28/08/2017'},
      {from: '05/05/2017', to:'23/06/2017'},
    ];
    
    let date = moment('21/02/2017', format);

    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);

    date = moment('04/25/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);

    date = moment('24/06/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);

    date = moment('05/07/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);

    date = moment('27/09/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);

    date = moment('13/04/2017', format);
    
    expect(visibleDates.itsInDateRanges(date, ranges)).toBe(false);
  });
});