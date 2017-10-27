import tools from './genericTools.js';

export default {
  

  /**
   * This function returns true when 'date' is in minimun date
   * 
   * @param {[String, Date, Moment]} date
   * @param {[String, Date, Moment]} minDate
   * @param {String} type
   * @returns {Boolean}
   */
  withinMin: function(date,minDate,type = 'days'){
    return (date.diff(minDate,type) > -1);
  },
  /**
   * This function returns true when 'date' is in maximun date
   * 
   * @param {[String, Date, Moment]} date
   * @param {[String, Date, Moment]} maxDate
   * @param {String} type
   * @returns {Boolean}
   */
  withinMax: function(date,maxDate,type = 'days'){
    return (date.diff(maxDate,type) < 1);
  },
  /**
   * This function returns true when 'date' is in the range
   * 
   * @param {[String, Date, Moment]} date 
   * @param {[String, Date, Moment]} min 
   * @param {[String, Date, Moment]} max 
   * @returns {Boolean}
   */
  itsInDateRange(date,min,max) {
    return (this.withinMin(date,min) && this.withinMax(date,max));
  },
  /**
   * This function returns false when the range properties
   * are not declared otherwise the itsInDateRange result returns
   * 
   * @param {[String, Date, Moment]} date 
   * @param {Object} range 
   * @returns {Boolean}
   */  
  validateRange: function(date,range) {
    if ((typeof range.from === 'undefined') || (typeof range.to === 'undefined')) {
      return false;
    }

    return  this.itsInDateRange(date, tools.createMomentDate(range.from), tools.createMomentDate(range.to));
  },
  /**
   * This function returns true when 'date' in any of the ranges
   * 
   * @param {[String, Date, Moment]} date 
   * @param {Array} ranges 
   * @returns {Boolean}
   */ 
  itsInDateRanges: function(date, ranges) {
    for (var index = 0; index < ranges.length; index++) {
      if(this.validateRange(date, ranges[index])) {
        return true;
      }
    }

    return false;
  },
  /**
   * This function returns true when 'date' in any of the dates
   * 
   * @param {[String, Date, Moment]} date 
   * @param {Array} dates 
   * @returns {Boolean}
   */ 
  itsInDates: function(date, dates) {
    for (var index = 0; index < dates.length; index++) {
      let dateToCompare = tools.createMomentDate(dates[index]).format(tools.presets.format);

      if (date.format(tools.presets.format) === dateToCompare) {
        return true;
      }
    }

    return false;
  },
  /**
   * This function returns true when 'weekday' is String and is declared 
   * 
   * @param {String} weekday 
   * @returns {Boolean}
   */
  weekdayParamFilter: function(weekday) {
    return (typeof weekday === 'string') && (typeof this.getWeekdayIndex(weekday) !== 'undefined');
  },

  /**
   * This function returns weekdaay
   * 
   * @param {String} weekday 
   * @returns {Number}
   */
  getWeekdayIndex: function(weekday) {
    let indices = {
      'sunday':0,
      'monday':1,
      'tuesday':2,
      'wednesday':3,
      'thursday':4,
      'friday':5,
      'saturday':6,
    }

    return indices[weekday];
  },
  /**
   * This function return true when the weekdays coincide
   * 
   * @param {Moment} date 
   * @param {String} weekday 
   * @returns {Boolean}
   */
  compareWeekdays: function(date, weekday) {
    if (this.weekdayParamFilter(weekday)) {
      return date.day() === this.getWeekdayIndex(weekday);
    } else {
      return false
    }
  },
  /**
   * This function return true when weekday concide with one weekdays element
   * 
   * @param {Moment} date 
   * @param {[String|Array]} weekdays 
   * @returns {Boolean}
   */
  itsInWeekdays: function(date, weekdays) {
    if (typeof weekdays !== 'string' && !Array.isArray(weekdays)) {
      return false;
    }

    weekdays = (typeof weekdays === 'string') ? [weekdays] : weekdays;

    for (var index = 0; index < weekdays.length; index++) {
      var weekday = weekdays[index];

      if (this.compareWeekdays(date, weekday)) { return true } 
    }

    return false
  }
};