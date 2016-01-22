import Ember from 'ember';

export default Ember.Controller.extend({
  newOpportunitiesSortFields: ['createdAt:desc'],
  newDevelopersSortFields: ['createdAt:desc'],
  chartData: Ember.computed('graph', function() {
    let graph = this.get('graph');
    return {
      labels: graph.get('months'),
      datasets: [
        {
            label: "Available",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(151,208,62,1)",
            pointColor: "rgba(151,208,62,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: graph.get('available')
        },
        {
            label: "Booked",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(80,212,241,1)",
            pointColor: "rgba(80,212,241,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: graph.get('booked')
        },
        {
            label: "Needed",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(233,51,39,1)",
            pointColor: "rgba(233,51,39,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: graph.get('needed')
        }

      ]
    };
  }),

  chartOptions: {
    bezierCurve: false,
    datasetFill: false,
    multiTooltipTemplate: '<%=datasetLabel%> <%= value %>'
  },

  sortedNewOpportunities: Ember.computed.sort('opportunities', 'newOpportunitiesSortFields'),
  sortedNewDevelopers: Ember.computed.sort('developers', 'newDevelopersSortFields'),

  recentOpportunities: Ember.computed('sortedNewOpportunities.[]', function() {
    return this.get('sortedNewOpportunities').slice(0,5);
  }),

  recentDevelopers: Ember.computed('sortedNewDevelopers.[]', function() {
    return this.get('sortedNewDevelopers').slice(0,5);
  }),

  availableSoonDevelopers: Ember.computed('developers.[]', function() {
    let today = new Date();
    let busyDevelopers = this.get('developers').sortBy('availableDate').filter((developer) => {
      let isFuture = developer.get('availableDate') > today;
      return isFuture && !developer.get('available');
    });
    return busyDevelopers.slice(0,5);
  })
});
