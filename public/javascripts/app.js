angular.module('comment', [])
.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.comments = [];
    
    $scope.addComment = function() {
        var comment = {
            title: $scope.formContent,
            upvotes: 0
        };
        
        $http.post('/comments', comment).success(function(data) {
            $scope.formContent = '';
            $scope.getAll();
        });
    };
    
    $scope.incrementUpvotes = function(comment) {
        $http.put('/comments/' + comment._id + '/upvotes')
        .success(function(data){
            $scope.getAll();
        });
    };
    
    $scope.getAll = function() {
        return $http.get('/comments').success(function(data) {
            angular.copy(data, $scope.comments);
        });
      };
      
    angular.element(document).ready(function () {
        $scope.getAll();
        $scope.$apply();
    });
    
  }
]);