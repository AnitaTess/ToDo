var app = angular.module("toDoApp", []);
app.controller("toDoController", function($scope) {
  // Initialize to-do list from local storage or empty array
  $scope.toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
  $scope.editedToDo = null;

  // Add new to-do
  $scope.addToDo = function() {
    $scope.toDoList.push({
      task: $scope.newToDo.task
    });
    $scope.newToDo = {};
    $scope.saveToDoList();
  };

  //Mark as done
  $scope.markAsDone = function(task) {
    task.done = !task.done;
    $scope.saveToDoList();
};
  
  // Edit to-do
  $scope.editToDo = function(item) {
    $scope.editedToDo = item;
  };

  // Save edited to-do
  $scope.saveEdit = function() {
    $scope.saveToDoList();
    $scope.editedToDo = null;
  };

  // Remove to-do
  $scope.removeToDo = function(item) {
    var index = $scope.toDoList.indexOf(item);
    $scope.toDoList.splice(index, 1);
    $scope.saveToDoList();
  };

  // Save to-do list to local storage
  $scope.saveToDoList = function() {
    localStorage.setItem("toDoList", JSON.stringify($scope.toDoList));
  };
});
