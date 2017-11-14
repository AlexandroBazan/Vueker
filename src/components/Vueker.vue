<template>
  <div class="row">
  	<div class="col-lg-12" >
  		<div class="input-group" :id="vuekerInputId">
  			<input id="vueker-input" class="form-control" :placeholder="placeholder" :value="showValue">
        <!-- Datetime picker box -->
  			<div  class="dropdown-menu vueker-box" :class="{right:calendar.right,top:calendar.top}" v-show="isShowlable" :id="vuekerBoxId">
          <!-- Calendar menu -->
          <div class="row calendar-header">
            <!-- Calendar monthYear button -->
            <div class="col-xs-5">
              <button  @click="showBoxState = 'months'" v-show="showBoxState == 'calendar'" type="button" class="btn btn-default btn-sm btn-month-year" >
                {{texts.months[calendar.month.key]}} {{calendar.year}}
              </button>
              <button  @click="showBoxState = 'years'" v-show="showBoxState == 'months'" type="button" class="btn btn-default btn-sm btn-month-year" >
                {{calendar.year}}
              </button>
            </div>
            <!-- [end] Calendar monthYear button -->
            <!-- Calendar pagination month menu -->
            <div class="col-xs-7 vueker-calendar-menu">
              <div v-show="showBoxState == 'calendar'" class="btn-group" role="group">
                <!-- Prev month button -->
                <button id="prev-button" type="button" class="btn btn-default btn-sm" @click="prevMonth()" :disabled="disabledPrevButton()">
                  <span class="glyphicon glyphicon-chevron-left"></span>
                </button>
                <!-- [end] Prev month button -->
                <!-- Today button -->
                <button
                  type="button"
                  class="btn btn-default btn-sm btn-today"
                  @click="today()"
                  :disabled="isTodayDisabled()"
                >
                  {{texts.today}}
                </button>
                <!-- [end] Today button -->
                <!-- Next month button -->
                <button
                  id="next-button"
                  type="button"
                  class="btn btn-default btn-sm"
                  @click="nextMonth()"
                  :disabled="disabledNextButton()"
                >
                  <span class="glyphicon glyphicon-chevron-right"></span>
                </button>
                <!-- [end] Next month button -->
              </div>
            </div>
            <!-- [end] Calendar pagination month menu -->
          </div>
          <!-- [end] Calendar menu -->
          <!-- Calendar table -->
  				<table class="vueker-table" v-show="showBoxState=='calendar'">
  					<thead>
              <!-- render header week -->
			    		<tr class="vueker-weekdays">
			    			<td  v-if="!sundayAtTheEnd">{{texts.weekdays.sunday}}</td>
			    			<td >{{texts.weekdays.monday}}</td>
			    			<td >{{texts.weekdays.tuesday}}</td>
			    			<td >{{texts.weekdays.wednesday}}</td>
			    			<td >{{texts.weekdays.thursday}}</td>
			    			<td >{{texts.weekdays.friday}}</td>
			    			<td >{{texts.weekdays.saturday}}</td>
			    			<td  v-if="sundayAtTheEnd">{{texts.weekdays.sunday}}</td>
			    		</tr>
              <!-- [end] render header week -->
  					</thead >
			    	<tbody >
              <!-- render weeks -->
			    		<tr v-for="weeks in calendar.weeks" :key="weeks.id">
			    			<td
                  class="vueker-date"
                  :class="{
                    'active':hasSelectDate(date.raw),
                    'today':isToday(date.raw),
                    'disabled':date.disabled,
                    'other-month':!date.isMonth
                  }"
                  v-for="date in weeks" :key="date.id"
                  @click="setSelectedDate(date)"
                >
			    				{{date.raw.date()}}
			    			</td>
			    		</tr>
              <!-- [end] render weeks -->
			    	</tbody>
			    </table>
          <!-- [end] Calendar table -->
          <!-- Months table -->
  				<table class="vueker-table" v-show="showBoxState=='months'">
  					
			    	<tbody >
              <!-- render weeks -->
			    		<tr v-for="(monthInterval, indexInterval) in texts.shortenedMonths" :key="monthInterval.id">
			    			<td 
                  class="vueker-date" 
                  :class="{
                    'active':hasSelectMonth(month.key,calendar.year),
                  }"
                  v-for="(month, index) in monthInterval" :key="month.id"
                  @click="makeCalendar(calendar.year,month.key);"
                >
			    				{{month.name}} 
			    			</td>
			    		</tr>
              <!-- [end] render weeks -->
			    	</tbody>
			    </table>
          <!-- [end] Months table -->
  			</div>
        <!-- [end] Datetime picker box -->
        <!-- Calendar input button -->
  			<span class="input-group-btn" :id="vuekerButtonId">
  				<button id="calendar-button" class="btn btn-default" type="button" @click="showCalendar()">
					<span class="glyphicon glyphicon-calendar"></span>
  				</button>
  			</span>
        <!-- [end] Calendar input button -->
  		</div>
  	</div>
  </div>
</template>

<script>
  import lang from '../utils/lang.js'
  import tools from '../utils/genericTools.js'
  import visibleDates from '../utils/visibleDates.js'

  var moment = require('moment');

  export default {
    name: 'vueker',
    props:{
      format: {
        type: String,
        default: 'MM-DD-YYYY',
      },
      placeholder: {
        type: String,
        default: '',
      },
    	lang: {
        type: String,
        default: 'en'
      },
      sundayAtTheEnd:{
      	type: Boolean,
      	default: false
      },
      initDate: {
      	type: [String, Object, Date],
      	default: null
      },
      startDate: {
      	type: [String, Object, Date],
      	default: null
      },
      endDate: {
      	type: [String, Object, Date],
      	default: null
      },
      visibleDates: {
      	type: [Object],
      	default: {}
      },
      enabledDates: {
      	type: [Object],
      	default: null
      }
    },
    data () {
      return {
        months: [
        	{key:'january'},
        	{key:'february'},
        	{key:'march'},
        	{key:'april'},
        	{key:'may'},
        	{key:'june'},
        	{key:'july'},
        	{key:'august'},
        	{key:'september'},
        	{key:'october'},
        	{key:'november'},
        	{key:'december'},
        ],
        selectedDate:null,
    	  calendar:{
          firstDate:null,
          lastDate:null,
          year:null,
          month:{
            key:null,
            number:null,
          },
          weeks:[],
          right:false,
          top:false,
        },
        isShowlable: false,
        showBoxState:'calendar',
        vuekerBoxId:-1,
        vuekerButtonId:-2,
        vuekerInputId:-1,
        mutable:{
          startDate:null,
          endDate:null,
        },
    	};
    },
    created: function () {
      tools.presets.format = this.format;

      this.vuekerBoxId = "vueker-box-"+this._uid;
      this.vuekerButtonId = "vueker-btn-"+this._uid;
      this.vuekerInputId = "vueker-input-"+this._uid;

      this.onBlur();

      this.mutable.startDate = this.setDateProp(this.startDate);
      this.mutable.endDate = this.setDateProp(this.endDate);

      if (this.initDate) {
        this.selectedDate = this.createMomentDate(this.initDate);

        this.makeCalendar(this.selectedDate.year(), this.selectedDate.month());
      }
    },
    computed: {
      texts: function () {
        return lang[this.lang];
      },
      /**
       * This function returns date with format
       *
       * @return {[string, null]}
       */
      showValue: function() {
        return (this.selectedDate) ? this.selectedDate.format(this.format) : null;
      },
    },
    methods: {
      /**
       * Setter function of [this.calendar] props
       *
       * @param {[Number]} fullYear
       * @param {[Number]} month
       */
      setCalendar: function(fullYear, month) {
        this.calendar.firstDate = new Date(fullYear, month, 1);
        this.calendar.lastDate = new Date(fullYear, month + 1, 0);

        this.calendar.year = this.calendar.firstDate.getFullYear();
        this.calendar.month.key = this.months[this.calendar.firstDate.getMonth()].key;
        this.calendar.month.number = this.calendar.firstDate.getMonth();
      },
      /**
       * This function creates weeks and dates  of calendar
       *
       * @param  {[Date]} date
       * @return {[Array]}
       */
      createWeeks: function(date) {
        var weeks = [];

        for (var week = 0; week < 6; week++) {
          weeks.push([]);
          weeks[week] = this.createWeekDays(date);
        }

        return weeks;
      },
      /**
       * This function creates weekdays  of week
       *
       * @param  {Date} initDate
       * @return {Array}
       */
      createWeekDays: function(date) {
        var week = [];

        for (var day = 0; day < 7; day++) {
          var raw = moment(new Date(date.setDate(date.getDate())));

          week.push({
            raw: raw,
            disabled: this.isDisabled(raw),
            isMonth: this.isMonth(date.getMonth()),
          });

          date.setDate(date.getDate()+1);
        }

        return week;
      },
      /**
       * This function create calendar
       *
       * @param  {[Number]} fullYear
       * @param  {[Number]} month
       * @return {[void]}
       */
    	makeCalendar: function(fullYear, month) {
        this.setCalendar(fullYear, month);

        var startCalendar = this.calendar.firstDate.getDate() - this.calendar.firstDate.getDay();

        if (this.sundayAtTheEnd) { ++startCalendar; }

        var initDate = new Date(this.calendar.year, this.calendar.month.number, startCalendar);

        if (this.sundayAtTheEnd && this.calendar.firstDate.getDay() === 0) {
          initDate.setDate(initDate.getDate() - 7)
        }

        this.calendar.weeks = this.createWeeks(initDate);

        this.showBoxState = 'calendar';
    	},

      /**
       * This function show and hide calendar
       *
       * @return {[void]}
       */
      showCalendar: function(){
        var input = document.getElementById(this.vuekerInputId);

        if(input !== undefined && input !== null) {
          this.setVerticalPositionCalendarBox(tools.getWindowHeight(), input.getBoundingClientRect().top,input);

          this.calendar.right = input.offsetWidth > 266;

          this.setDefaultSelectedDate();

          this.isShowlable = !this.isShowlable;

          this.showBoxState = 'calendar';
        }
      },
      createMomentDate: function(date) {
        return (typeof date == 'string') ? moment(date,this.format) : moment(date);
      },
      /**
       * This function set Today in selectedDate when its value is null
       *
       */
      setDefaultSelectedDate: function() {
        if (!this.selectedDate) {
          this.selectedDate = moment();
          this.makeCalendar(this.selectedDate.year(), this.selectedDate.month());
        }
      },
      /**
       * This function calculate vertical position of the calendar box
       *
       * @param {int} height
       * @param {int} top
       * @param {Object} input
       */
      setVerticalPositionCalendarBox: function(height,top,input){
        var box = document.getElementById(this.vuekerBoxId);

        if ((height / 2) < top) {
          box.style.bottom = (input.offsetHeight + 6)+"px";

          this.calendar.top = true;
        } else {
          box.style.bottom = 'inherit';
          
          this.calendar.top = false;
        }
      },
      /**
       * This function emulates the event @blur in the calendar element
       *
       * @return {[void]}
       */
      onBlur: function(){
        var vm = this;

        var body = document.getElementsByTagName('html');

        body[0].addEventListener('click', function(e) {
          var x = e.clientX, y = e.clientY;

          var box = document.querySelector('#'+vm.vuekerBoxId).getBoundingClientRect();
          var btn = document.querySelector('#'+vm.vuekerButtonId).getBoundingClientRect();

          if(vm.isShowlable && !vm.hasClickElement(box,x,y) && !vm.hasClickElement(btn,x,y)) {
            vm.closeCalendar();
          }
        });
      },
      /**
       * This function set This dates properties
       *
       * @param {[string|null]} date
       * @return {moment}
       */
      setDateProp: function(date) {
        if(typeof date == 'string') {
          return moment(date,this.format);
        }

        return (date) ? moment(date) : null;
      },
      /**
       * This function returns true when the X and Y coordinates are in the element area
       *
       * @param  {[DOM element]}  element
       * @param  {[clienX]}  x
       * @param  {[clientY]}  y
       * @return {Boolean}
       */
      hasClickElement: function(element,x,y) {
        var position = element;

        var inX = (position.left <= x && position.right >= x);
        var inY = (position.top <= y && position.bottom >= y);

        return inX && inY;
      },
      /**
       * This function close calendar
       *
       * @return {[void]}
       */
      closeCalendar: function() {
        this.isShowlable = false;
      },
      /**
       * This function returns true when month is selected
       *
       * @param  {[Number]}  month
       * @param  {[Number]}  year
       * @return {Boolean}
       */
      hasSelectMonth: function(month,year) {
        return this.selectedDate.month() == month
            && this.selectedDate.year() == year;
      },
      /**
       * This function returns true when [date] is a selected date
       *
       * @param  {[moment]}  date
       * @return {Boolean}
       */
      hasSelectDate: function(date) {
        let format = 'DD/MM/YYYY';

        return this.selectedDate.format(format) == date.format(format);
      },
      /**
       * Setter function of selectedDate
       *
       * @param {[Date]} date
       */
      setSelectedDate: function(date) {
        if (date.disabled ) { return; }

        this.selectedDate = moment(date.raw);

        if (!date.isMonth) {
          this.makeCalendar(this.selectedDate.year(), this.selectedDate.month());
        }
      },
      /**
       * this function shows the next month
       * @return {[void]}
       */
      nextMonth: function() {
        this.makeCalendar(this.calendar.year, this.calendar.month.number+1);
      },
      /**
       * this function shows the previous month
       *
       * @return {[void]}
       */
      prevMonth: function() {
        this.makeCalendar(this.calendar.year, this.calendar.month.number-1);
      },
      /**
       * this function shows the current month and selects the current day
       *
       * @return {[void]}
       */
      today: function() {
        var date = new Date();
        this.selectedDate = moment(date);
        this.makeCalendar(date.getFullYear(), date.getMonth())
      },
      /**
       * This function returns true when [month] equals calendar month
       * 
       * @param  {[Number]}  month
       * @return {Boolean}
       */
      isMonth: function(month) {
        return  month == this.calendar.month.number;
      },
      /**
       * This function returns true when [date] is current day
       *
       * @param  {[Date]}  date
       * @return {Boolean}
       */
      isToday: function(date) {
        var today = moment();

        return today.year() == date.year()
            && today.month() == date.month()
            && today.date() == date.date();
      },
      /**
       * This function returns true when [date] is disabled
       *
       * @param  {[moment]} date
       * @return {[Boolean]}
       */
      isDisabled: function(date) {
        var isntInRenderRange = !visibleDates.itsInDateRange(date,this.mutable.startDate,this.mutable.endDate);

        var ruleResults = (this.visibleDates.mode === 'enable') 
                        ? !this.runRules(date, this.visibleDates.rules) 
                        : this.runRules(date, this.visibleDates.rules);
                        
        return isntInRenderRange ? isntInRenderRange : ruleResults;
      },
      /**
       * 
       */
      runRules: function(date, rules) {
        for (var index in rules) {
          var ruleIndex = this.getRuleIndex(index);
          
          if (ruleIndex && visibleDates[ruleIndex](date, rules[index])) {
            return true;
          }
        }

        return false;
      },

      getRuleIndex: function(index) {
        var rules = {
          dates: 'itsInDates',
          ranges: 'itsInDateRanges',
          weekdays: 'itsInWeekdays',
        };

        return rules[index];
      },
      /**
       * This function returns true when "today" is disabled
       *
       * @return {Boolean}
       */
      isTodayDisabled: function() {
        return this.isDisabled(moment());
      },
      getCurrentMonth() {
        return moment(new Date(this.calendar.year,this.calendar.month.number));
      },
      /**
       * This function returns true when current selected month
       * is equals startDate
       *
       * @return {Boolean}
       */
      disabledPrevButton: function() {
        if (!this.mutable.startDate) { return false; }

        var currentMonth = this.getCurrentMonth();

        if (this.mutable.startDate.year() == currentMonth.year()) {
          return this.mutable.startDate.month() == currentMonth.month()
        } else {
          return false;
        }
      },
      /**
       * This function returns true when current selected month
       * is equals endDate
       *
       * @return {Boolean}
       */
      disabledNextButton: function() {
        if (!this.mutable.endDate) { return false; }

        var currentMonth = this.getCurrentMonth();

        if (this.mutable.endDate.year() == currentMonth.year()) {
          return this.mutable.endDate.month() == currentMonth.month()
        } else {
          return false;
        }
      }
    }
  }
</script>


<style scoped>
  .vueker-box{
      padding: 4px;
      width: 266px;
  	  display: block;
  }
  .vueker-box.right{
      right: 0;
      left: inherit;
  }
  .vueker-box.right:before{
      right: 7px;
      left: inherit;
  }
  .vueker-box.right:after{
      right: 8px;
      left: inherit;
  }

  .vueker-box.top{
      bottom: 0;
      top: inherit;
  }
  .vueker-box.top:before{
      bottom: -8px;
      top: inherit;
      border-bottom: inherit;
      border-top: 7px solid #cccccc;
      border-top-color: rgba(0, 0, 0, 0.2);
  }
  .vueker-box.top:after{
      bottom: -7px;
      top: inherit;
      border-bottom: inherit;
      border-top: 6px solid #fff;
  }
  .vueker-table{
  	width: 100%;
  	text-align: center;
  	margin: 0;
  }
  .vueker-table > tbody > tr > td {
  	width: 20px;
      height: 20px;
      line-height: 20px;
      padding: 5px;
  }
  .vueker-box:before {
  	content: '';
      display: inline-block;
      position: absolute;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #cccccc;
      border-bottom-color: rgba(0, 0, 0, 0.2);
      top: -7px;
      left: 7px;
  }
  .vueker-box:after {
  	content: '';
      display: inline-block;
      position: absolute;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #eaeaea;
      top: -6px;
      left: 8px;
  }
  .vueker-weekdays{
  	font-weight: bold;
  }
  .btn-month-year,.btn-today{
    font-weight: bold;
    color: #337ab7;
  }

  .vueker-calendar-menu{
    display: flex;
    justify-content: flex-end;
  }
  .vueker-hr {
    margin-top: 4px;
    margin-bottom: 4px;
    border-color: #cbcbcb;
  }
  .calendar-header{
    margin-left: -4px;
    margin-right: -4px;
    margin-top: -4px;
    background-color: #eaeaea;
    border-bottom: 1px solid #ccc;
    padding: 4px;
    margin-bottom: 8px;
  }
  .calendar-header div:first-child {
    padding-left: 0px;
  }
  .calendar-header div:last-child {
    padding-right: 0px;
  }
  .vueker-date {
    border-radius: 3px;
    position: relative;
  }
  .vueker-date:hover {
    cursor: pointer;
    background-color: #eaeaea;
  }
  .vueker-date.active{
    background-color: #337ab7;
    color: #fff;
    font-weight: bold;
  }

  .vueker-date.today:before{
      content: '';
      display: inline-block;
      border: solid transparent;
      border-width: 0 0 7px 7px;
      border-bottom-color: #337ab7;
      position: absolute;
      bottom: 4px;
      right: 4px;
  }

  .vueker-date.active.today:before{
      border-bottom-color: #fff;
  }
  .vueker-date.active.disabled.today:before,.vueker-date.other-month.today:before{
      border-bottom-color: #337ab7;
  }
  .vueker-date.disabled,.vueker-date.other-month{
    background-color: #fff;
    color: #cbcbcb;
    border-radius: 0px;
  }
  .vueker-date.disabled{
    cursor: not-allowed;
  }
</style>
