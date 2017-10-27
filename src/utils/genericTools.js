var moment = require('moment');

export default {
  
  presets:{
    format:'MM-DD-YYYY',
  },
  /**
   * This function returns a moment object from a string
   * or other accepted type
   * 
   * @param {[String, Date, Moment]} date 
   * @returns {Boolean}
   */
  createMomentDate: function(date) {
    return (typeof date == 'string') ? moment(date,this.presets.format) : moment(date);
  },
}