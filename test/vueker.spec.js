
import {mount} from 'vue-test-utils';
import Vueker from '../dist/Vueker.vue';
import expect from 'expect';

var moment = require('moment');

describe('Vueker TDD', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Vueker);
  });
  
  it('has selected date return true', () => {
    let date = moment('12/10/2017','DD/MM/YYYY');

    let wrapper = mount(Vueker,{propsData:{'initDate': date }});

    expect(wrapper.vm.hasSelectDate(date)).toBe(true);
  
  });

  it('has selected date return false', () => {
    let date = moment('12/10/2017','DD/MM/YYYY');

    let wrapper = mount(Vueker,{propsData:{'initDate': date }});

    expect(wrapper.vm.hasSelectDate(moment('11/10/2017','DD/MM/YYYY'))).toBe(false);
  
  });

  it('can create weekdays', () => {
    let firstDateOfTheWeek = new Date("10-02-2017");

    let weekDays = wrapper.vm.createWeekDays(firstDateOfTheWeek);

    expect(weekDays.length).toBe(7);
    
    expect(weekDays[0].raw.format('DD/MM/YYYY')).toBe('02/10/2017');

    expect(weekDays[6].raw.format('DD/MM/YYYY')).toBe('08/10/2017');
    
  });

  it('can create calendar weeks', () => {
    wrapper.update();

    var firstDateOfTheWeek = new Date("10-02-2017");

    let weeks = wrapper.vm.createWeeks(firstDateOfTheWeek);

    expect(weeks.length).toBe(6);

    expect(weeks[0].length).toBe(7);
    
    expect(weeks[0][0].raw.format('DD/MM/YYYY')).toBe('02/10/2017');
    
    expect(weeks[5][6].raw.format('DD/MM/YYYY')).toBe('12/11/2017');
  });

  it('the first day of the month begins on Sunday', () => {
    let wrapper = mount(Vueker,{
      propsData:{
        'initDate': '10-15-2017'
      }  
    });

    wrapper.vm.makeCalendar(2017,9);

    let weeks = wrapper.vm.calendar.weeks;

    expect(weeks.length).toBe(6);

    expect(weeks[0].length).toBe(7);
    
    expect(weeks[0][0].raw.format('DD/MM/YYYY')).toBe('01/10/2017');
    
    expect(weeks[5][6].raw.format('DD/MM/YYYY')).toBe('11/11/2017');
  });

  it('the first day of the month begins on Monday', () => {
    let wrapper = mount(Vueker,{
      propsData:{
        'initDate': '10-15-2017',
        'sundayAtTheEnd': true,
      }  
    });

    wrapper.vm.makeCalendar(2016,1);

    let weeks = wrapper.vm.calendar.weeks;

    expect(weeks.length).toBe(6);

    expect(weeks[0].length).toBe(7);
    
    expect(weeks[0][0].raw.format('DD/MM/YYYY')).toBe('01/02/2016');
    
    expect(weeks[5][6].raw.format('DD/MM/YYYY')).toBe('13/03/2016');
  });

  it('the first day of the month begins on friday', () => {
    let wrapper = mount(Vueker,{
      propsData:{
        'initDate': '10-15-2017',
      }  
    });

    wrapper.vm.makeCalendar(2017,8);

    let weeks = wrapper.vm.calendar.weeks;

    expect(weeks.length).toBe(6);

    expect(weeks[0].length).toBe(7);
    
    expect(weeks[0][5].raw.format('DD/MM/YYYY')).toBe('01/09/2017');
    
    expect(weeks[5][6].raw.format('DD/MM/YYYY')).toBe('07/10/2017');
  });

  it('is month return true', () => {
    let date = moment('12/10/2017','DD/MM/YYYY');

    let wrapper = mount(Vueker,{propsData:{'initDate': date }});

    expect(wrapper.vm.isMonth(9)).toBe(true);
  
  });

  it('is month return false', () => {
    let date = moment('12/10/2017','DD/MM/YYYY');

    let wrapper = mount(Vueker,{propsData:{'initDate': date }});

    expect(wrapper.vm.isMonth(11)).toBe(false);
  
  });

  it('is today return true', () => {
    wrapper.update();

    expect(wrapper.vm.isToday(moment())).toBe(true);
  });

  it('is today return false', () => {
    wrapper.update();

    expect(wrapper.vm.isToday(moment('10/03/1991','DD/MM/YYYY'))).toBe(false);
  
  });

  it('is disabled return true', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'minDate': '01/10/2017', 
        'maxDate': '11/10/2017', 
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.isDisabled(moment('14/10/2017','DD/MM/YYYY'))).toBe(true);
  });

  it('is disabled return false', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'minDate': '01/10/2017', 
        'maxDate': '11/10/2017', 
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.isDisabled(moment('01/10/2017','DD/MM/YYYY'))).toBe(false);
    expect(wrapper.vm.isDisabled(moment('05/10/2017','DD/MM/YYYY'))).toBe(false);
    expect(wrapper.vm.isDisabled(moment('11/10/2017','DD/MM/YYYY'))).toBe(false);
  
  });

  it('is disabled today return true', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'minDate': moment().add(7,'d'), 
        'maxDate': moment().add(14,'d'),  
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.isTodayDisabled(moment())).toBe(true);
  });

  it('is disabled today return false', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'minDate': moment().subtract(7,'d'), 
        'maxDate': moment().add(14,'d'), 
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.isTodayDisabled(moment())).toBe(false);
  
  });

  it('disabled prev button return true', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'initDate': '12/10/2017',
        'minDate': '01/10/2017',  
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.disabledPrevButton()).toBe(true);
  });

  it('disabled prev button return false', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'initDate': '12/01/2017',
        'minDate': '01/10/2017', 
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.disabledPrevButton()).toBe(false);  
  
  });

  it('disabled prev button return false without init props', () => {
    wrapper.update();

    expect(wrapper.vm.disabledPrevButton()).toBe(false);    
  
  });

  it('disabled next button return true', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'initDate': '12/10/2017',
        'maxDate': '13/10/2017',  
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.disabledNextButton()).toBe(true);
  });

  it('disabled next button return false', () => {
    let wrapper = mount(Vueker, {
      propsData:{
        'initDate': '12/01/2017',
        'maxDate': '01/10/2017', 
        'format': 'DD/MM/YYYY'
      }
    });

    expect(wrapper.vm.disabledNextButton()).toBe(false);  
  
  });

  it('disabled next button return false without init props', () => {
    wrapper.update();

    expect(wrapper.vm.disabledNextButton()).toBe(false);    
  
  });

});

describe('Vueker BDD', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = mount(Vueker);
  });

  it('verifying default properties', () => {
    expect(wrapper.vm.lang).toBe('en');

    expect(wrapper.vm.format).toBe('MM-DD-YYYY'); 
  });

  it('changing the text language', () => {
    wrapper.update();

    wrapper.setProps({lang: 'es'});

    expect(wrapper.vm.lang).toBe('es');

    expect(wrapper.vm.texts.today).toBe('Hoy');

    expect(wrapper.find('.btn-today').html()).toContain('Hoy');
  });

  it('changing the init date', () => {
    //wrapper.update();

    let initDate = '10-15-2017';

    wrapper.setProps({'initDate': initDate});

    expect(wrapper.vm.initDate).toBe(initDate);
  });

  it('changing the date format', () => {
    let wrapper = mount(Vueker,{
      propsData:{
        'initDate': '15/10/2017',
        'format': 'DD/MM/YYYY'
      }  
    });
    
    expect(wrapper.vm.showValue).toBe('15/10/2017');
    expect(wrapper.vm.initDate).toBe('15/10/2017');
  });

  it('show the calendar by clicking on the button', () => {
    wrapper.update();
    
    wrapper.find('#calendar-button').trigger('click');

    expect(wrapper.find('.vueker-box').hasStyle('display','none')).toBe(false);
  });

});