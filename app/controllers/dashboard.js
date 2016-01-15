import Ember from 'ember';

export default Ember.Controller.extend({
  newOpportunitiesSortFields: ['createdAt:desc'],
  newDevelopersSortFields: ['createdAt:desc'],
  chartData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            label: "Available",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(151,208,62,1)",
            pointColor: "rgba(151,208,62,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Booked",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(80,212,241,1)",
            pointColor: "rgba(80,212,241,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
            label: "Needed",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(233,51,39,1)",
            pointColor: "rgba(233,51,39,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [40, 23, 30, 56, 75, 52, 96]
        }
    ]
  },

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
