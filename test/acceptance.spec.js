
import {mount} from 'vue-test-utils';
import Vueker from '../src/components/Vueker.vue';
import expect from 'expect';

var moment = require('moment');

/*
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

});*/