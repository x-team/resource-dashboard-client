import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['data-test'],
  'data-test': 'pagination',

  itemsPerPage: 10,

  //if number of pages is more than max, ellipsis will be shown (prevent huge pagination)
  maxPagesShown: 5,

  showPagination: Ember.computed.gt('totalPagesCount', 1),
  lastPage: Ember.computed.alias('totalPagesCount'),

  totalPagesCount: Ember.computed('totalItemsCount', 'itemsPerPage', function() {
    var totalCount = this.get('totalItemsCount'),
        itemsPerPage = this.get('itemsPerPage');
    return Math.ceil(totalCount / itemsPerPage);
  }),

  hasPrevious: Ember.computed('page', function() {
    return this.get('page') > 1;
  }),

  hasNext: Ember.computed('page', 'totalPagesCount', function() {
    return this.get('page') < this.get('totalPagesCount');
  }),

  /**
   * show limited number of pages the user can choose from
   *
   * @property visiblepages
   * @type Array an array of visible pages
   */
  visiblePages: Ember.computed('page', 'totalPagesCount', 'maxPagesShown', function() {
    var totalPagesCount = this.get('totalPagesCount'),
        page = this.get('page'),
        maxPagesShown = this.get('maxPagesShown');

    //helper function to populate the last page to be shown
    var finish = function(start, end) {
      return start + end - 1;
    };

    if (totalPagesCount < maxPagesShown) {
      maxPagesShown = totalPagesCount;
    }

    var start = page - parseInt(maxPagesShown / 2, 10);

    if (finish(start, maxPagesShown ) > totalPagesCount) {
      start = totalPagesCount-maxPagesShown + 1;
    }

    if (start < 1) {
      start = 1;
    }

    var finishPage = finish(start, maxPagesShown);

    //return array from start to finishPage
    var result = [];
    for (var i = start; i <= finishPage; i++){
      result.push(i);
    }
    return result;
  }),

  /**
   * showing ellipses and first page link at the beginning if the first available page is the second page or later
   *
   * @property showBeforeEllipsis
   * @type bool
   */
  showBeforeEllipsis: Ember.computed('visiblePages', 'visiblePages.[]', function() {
    return this.get('visiblePages.firstObject') >= 2;
  }),

  /**
   * showing ellipses and last page link at the end if the difference between the last page and the last available page is more than one
   *
   * @property showAfterEllipsis
   * @type bool
   */
  showAfterEllipsis: Ember.computed('visiblePages.[]', 'lastPage', function() {
    return Math.abs(this.get('lastPage') - this.get('visiblePages.lastObject')) >= 1;
  }),

  /**
   * Returns the index of the last item shown in the current page
   * @property lastItemShownIndex
   * @return {int}
   */
  lastItemShownIndex: Ember.computed('itemsPerPage', 'page', 'totalItemsCount', function() {
    var lastItem = this.get('itemsPerPage') * this.get('page'),
        totalItemsCount = this.get('totalItemsCount');
    return lastItem > totalItemsCount ? totalItemsCount : lastItem;
  }),

  /**
   * Returns the index of the first item shown in the current page
   * @property firstItemShownIndex
   * @return {int}
   */
  firstItemShownIndex: Ember.computed('itemsPerPage', 'page', 'totalItemsCount', function() {
    var firstItem = this.get('itemsPerPage') * (this.get('page') - 1) + 1;
    if(this.get('totalItemsCount') === 0 || firstItem <= 0) {
      return 0;
    }
    return firstItem;
  }),

  actions: {

    goToNextPage: function() {
      if(this.get('hasNext')) {
        var currentPage = this.get('page');
        this.send('goToPage', currentPage + 1);
      }
    },

    goToPreviousPage: function() {
      if(this.get('hasPrevious')) {
        var currentPage = this.get('page');
        this.send('goToPage', currentPage - 1);
      }
    },

    goToPage: function(pageNumber) {
      if(pageNumber >= 1 && pageNumber <= this.get('lastPage')) {
        this.get('onSelect')(pageNumber);
      }
    }

  }
});
