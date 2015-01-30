!function(angular){var gameOnApp=this.gameOnApp=angular.module("gameOnApp",["ngRoute","ngStorage","ui.bootstrap"]);gameOnApp.run(["$location","$rootScope","$route",function($location,$rootScope,$route){$rootScope.$on("$routeChangeSuccess",function(){console.log($route.current.$$route.title),$rootScope.title=$route.current.$$route.title})}]),gameOnApp.controller("MainController",function($scope,Config,$route,$routeParams,$location){$scope.$route=$route,$scope.$routeParams=$routeParams,$scope.$location=$location,$scope.config=Config,$scope.menu=[],angular.forEach($route.routes,function(route,link){route.menu&&$scope.menu.push({title:route.title,link:link,image:route.image})}),$scope.aside={open:!1,openAside:function(open){$scope.aside.open=angular.isUndefined(open)?!$scope.aside.open:open}}}),gameOnApp.factory("Config",function(){var Config=function(){var url="http://localhost/klaus/game-on/",root="app/",img="assets/img/",js="assets/js/",css="assets/css/",components="components/";this.img=url+img,this.js=url+js,this.css=url+css,this.components=root+components,this.baseUrl=function(route){return url+route}};return new Config})}(window.angular),function(){var components="app/components/";gameOnApp.config(function($routeProvider,$locationProvider){$routeProvider.otherwise({redirectTo:"/"}).when("/",{templateUrl:components+"todo/todoView.html",controller:"TodoController",title:"Home",menu:!0,image:"fa-home"}).when("/teste/:isso?",{templateUrl:components+"teste/testeView.html",controller:"TesteController",title:"Teste"}).when("/outro-teste",{templateUrl:components+"teste/testeView.html",controller:"TodoController",title:"Testado",menu:!0,image:"fa-cube"}),$locationProvider.html5Mode(!0)})}(window.angular),function(){gameOnApp.controller("TesteController",function($scope,Config,$route){$scope.name="TesteController",$scope.config=Config,$scope.$route=$route})}(window.angular),function(){gameOnApp.controller("TodoController",function($scope,Config,Task,$localStorage,$modal,$route,$routeParams,$filter){$scope.name="TodoController",$scope.config=Config,$scope.taskFct=Task,$scope.newList="",$scope.$watch("newList.title",function(){$scope.newList.title=$filter("capitalize")($scope.newList.title)}),$scope.$storage=$localStorage.$default({lists:[],rewards:[],order:[]}),$scope.open=function(task){$modal.open({templateUrl:Config.baseUrl("app/components/shared/modal/taskModalView.html"),controller:"TaskModalController",resolve:{task:function(){return task}}})},$scope.lists=$scope.$storage.lists,$scope.rewards=$scope.$storage.rewards,$scope.toogleChecked=function(list,task){var taskIndex=(listIndex=$scope.lists.indexOf(list),$scope.lists[listIndex].tasks.indexOf(task));$scope.lists[listIndex].tasks[taskIndex].done=!$scope.lists[listIndex].tasks[taskIndex].done},$scope.addList=function(list){$scope.lists.push({title:list.title,tasks:[],newTask:{}}),$scope.$storage.lists=$scope.$storage.lists?$scope.$storage.lists:$scope.lists},$scope.deleteAllLists=function(){delete $scope.$storage.lists,$scope.lists=[]},$scope.addTask=function(list,task){if(task.name){var index=$scope.lists.indexOf(list);task.done=task.done||!1,$scope.lists[index].tasks.push({name:task.name,done:task.done,options:!1,status:0})}}}),gameOnApp.controller("TaskModalController",function($scope,$modalInstance,task){console.log(task),$scope.task=task})}(window.angular),function(angular){gameOnApp.directive("taskList",function(){return{restrict:"E",templateUrl:"app/components/todo/taskListView.html"}}),gameOnApp.directive("task",function(){return{restrict:"E",templateUrl:"app/components/todo/taskView.html"}}),gameOnApp.directive("taskPreview",function(){return{restrict:"E",templateUrl:"app/components/todo/taskPreviewView.html"}}),gameOnApp.factory("Task",function($localStorage){return{showTask:function(task){alert(task.name)},cloneTask:function(list,task){var clonedTask=angular.copy(task);clonedTask.options=!1,list.tasks.push(clonedTask)},toogleOption:function(list,task){angular.forEach(list.tasks,function(tasks,index){index!=list.tasks.indexOf(task)&&(tasks.options=!1)}),angular.isUndefined(task)||(task.options=!task.options)},deleteTask:function(list,task){var listIndex=$localStorage.lists.indexOf(list),taskIndex=list.tasks.indexOf(task);$localStorage.lists[listIndex].tasks.splice([taskIndex],1)},updateStatus:function(list,task,value){var listIndex=$localStorage.lists.indexOf(list),taskIndex=list.tasks.indexOf(task),status=$localStorage.lists[listIndex].tasks[taskIndex].status;5>=status+value&&status+value>=-5&&($localStorage.lists[listIndex].tasks[taskIndex].status+=value)}}}),gameOnApp.filter("taskStatus",function(){return function(status){return 0>status&&status>=-5?"status-negative-"+Math.abs(status):status>0&&5>=status?"status-positive-"+status:""}})}(window.angular);