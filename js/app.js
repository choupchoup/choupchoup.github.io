(function () {
  'use strict';

  angular.module('choup', [
      'ngRoute',
      'slick'
    ])
    .config(['$routeProvider', function ($routeProvider) {


      $routeProvider
        .when('/index', {
          templateUrl: '/pages/accueil.html',
          controller: 'PageTitle',
          resolve: {
            pageTitle: ['DEFAULT_TITLE', function (DEFAULT_TITLE) {
              return DEFAULT_TITLE;
            }]
          }
        });
      

      // home pages for categories
      $routeProvider.when('/:category', {
        templateUrl: function (urlAttribute) {
          return '../pages/' + urlAttribute.category + '/index.html';
        },
        resolve: {
          pageTitle: function ($route) {
            var params = $route.current.params;
            return params.category.charAt(0).toUpperCase() + params.category.slice(1);
          }
        },
        controller: 'PageTitle'
      });

      // specific pages for categories
      $routeProvider.when('/:category/:name', {
        templateUrl: function (urlAttribute) {
          return '../pages/' + urlAttribute.category + '/' + urlAttribute.name + '.html';
        },
        resolve: {
          pageTitle: function ($route) {
            var params = $route.current.params;
            return params.category.charAt(0).toUpperCase() + params.category.slice(1);
          }
        },
        controller: 'PageTitle'
      });

      // specific pages for categories and sub categories
      $routeProvider.when('/:category/:sub/:name', {
        templateUrl: function (urlAttribute) {
          return '../pages/' + urlAttribute.category +'/' + urlAttribute.sub + '/' + urlAttribute.name + '.html';
        },
        resolve: {
          pageTitle: function ($route) {
            var params = $route.current.params;
            return params.category.charAt(0).toUpperCase() + params.category.slice(1);
          }
        },
        controller: 'PageTitle'
      });

      $routeProvider
        .otherwise({
          redirectTo: '/index'
        });
    }])
    .constant('DEFAULT_TITLE', 'Enjoy Choup Choup')
    .controller('PageTitle', ['pageTitle', 'PageState', function (pageTitle, PageState) {
      PageState.setPageTitle(pageTitle);
    }])
    .controller('Main', ['$scope', 'PageState', function ($scope, PageState) {
      var vm = this;
      vm.title = PageState.getPageTitle();

      $scope.$watch(function () {
        return PageState.getPageTitle();
      }, function (newValue) {
        vm.title = newValue;
      });
    }])
    .factory('PageState', ['DEFAULT_TITLE', function (DEFAULT_TITLE) {

      var pageTitle = DEFAULT_TITLE;

      return {
        setPageTitle: setPageTitle,
        getPageTitle: getPageTitle
      };

      function getPageTitle () {
        return pageTitle;
      }

      function setPageTitle (title) {
        pageTitle = title;
      }
    }]);

})();