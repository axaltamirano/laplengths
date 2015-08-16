$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
})

var app = angular.module('app',[]);

app.controller('LapLength', ['$scope', function($scope) {
	
	$scope.fc = 5000;
	$scope.fy = 60000;
	$scope.epoxy = false;
	$scope.cover = 2;
	$scope.spacing = 12;
	$scope.lightweight = false;
	$scope.ties = false;
	$scope.displayFeetInch = true;
	
	$scope.lambda = function()
	{
		/*
		** The ACI lightweight factor does vary based on
		** type of concrete, between 0.75 and 0.85.
		** However, for determining development lengths,
		** Chapter 12 requires lambda = 0.75 unless the 
		** provisions of 12.2.4d are met. For simplicity
		** we will just use 0.75
		*/
		return ($scope.lightweight)? 0.75 : 1;
	}
	
	$scope.rebar = [
		{'id':3, 'db':0.375, 'a':0.11},
		{'id':4, 'db':0.500, 'a':0.20},
		{'id':5, 'db':0.625, 'a':0.31},
		{'id':6, 'db':0.75,'a':0.44},
		{'id':7, 'db':0.875,'a':0.60},
		{'id':8, 'db':1.000,'a':0.79},
		{'id':9, 'db':1.128,'a':1.00},
		{'id':10,'db':1.270,'a':1.27},
		{'id':11,'db':1.410,'a':1.56},
		{'id':14,'db':1.693,'a':2.25},
		{'id':18,'db':2.257,'a':4.00}];
	
	// UTILITIES
	
	$scope.convertToFeetInch = function(inches) {

		if (inches == false)
		{
			return "-";
		}

		var rounded = Math.ceil(inches);
		if ($scope.displayFeetInch)
		{

			var feet = Math.floor(rounded/12);
			var inch = rounded - (feet * 12);
			if (feet > 0)
			{
				return feet + "'-" + inch + "\"";
			}	
			else
			{
				return inch + "\"";
			}
		}
		return rounded;
	};
	
	
	// CONSTANTS
	
	$scope.getSqrtFc = function()
	{
		// per ACI 12.1.2, sqrt(fc) shall not exceed 100
		return Math.min(Math.sqrt($scope.fc), 100);
	}
	
	// TENSION DEVELOPMENT LENGTHS
	
	$scope.calculateLd = function(db, isTop, ignoreMin)
	{
		var minLength = ignoreMin? 0 : 12;
		var phi_t = isTop? 1.3 : 1.0;
		var phi_e = 1.0;
		if ($scope.epoxy)
		{
			phi_e = 1.2;
			if ($scope.cover < 3*db || $scope.spacing < 6*db)
			{
				phi_e = 1.5;
			}
		}
		
		if ($scope.meetsCoverRequirements(db))
		{
			if (db < 0.875)
			{
				return Math.max(minLength,($scope.fy * Math.min(1.7, phi_e*phi_t) * db) / (25 * $scope.lambda() * $scope.getSqrtFc()));
			}
			else
			{
				return Math.max(minLength,($scope.fy * Math.min(1.7, phi_e*phi_t) * db) / (20 * $scope.lambda() * $scope.getSqrtFc()));
			}
		}
		else
		{
			if (db < 0.875)
			{
				return Math.max(minLength,(3 * $scope.fy * Math.min(1.7, phi_e*phi_t) * db) / (50 * $scope.lambda() * $scope.getSqrtFc()));
			}
			else
			{
				return Math.max(minLength,(3 * $scope.fy * Math.min(1.7, phi_e*phi_t) * db) / (40 * $scope.lambda() * $scope.getSqrtFc()));
			}
		}
	}
	
	$scope.meetsCoverRequirements = function(db) {
		if ($scope.ties == true && db < $scope.cover && db < $scope.spacing)
		{
			return true;
		}
		if ($scope.ties == false && db < $scope.cover && db < 2*$scope.spacing)
		{
			return true;
		}
		return false;
	}
	
	$scope.calculateLdh = function(db) {
		var phi_e = ($scope.epoxy)? 1.2 : 1.0;
		return Math.max(6, 8*db, (0.02 * $scope.fy * phi_e * db) / ($scope.lambda() * $scope.getSqrtFc()));
	}
	
	$scope.calcMinBend = function(db, isTie) {
		if (db < 0.75 && isTie) // ACI 318-08 7.2.2
		{
			return 4 * db;
		}
		
		// TABLE 7.2
		if (db < 1.128)
		{
			return 6 * db;
		}
		if (db < 1.693)
		{
			return 8 * db;
		}
		return 10 * db;
	}
	
	$scope.calculateLdc = function(db) {
		return Math.max(8, (0.02 * $scope.fy * db) / ($scope.lambda() * $scope.getSqrtFc()), 0.0003 * $scope.fy * db);
	}
	
	
	// SPLICING
	
	$scope.calculateLb = function(db, isTop)
	{
		if (db < 1.693)
		{
			return Math.max(12, 1.3 * $scope.calculateLd(db, isTop, true));
		}
		return false;
	}
	
	$scope.calculateLbc = function(db) {
		var lengthMultiplier = ($scope.fc < 3000)? 1.33 : 1.00;
		
		if ($scope.fy <= 60000)
		{
			return lengthMultiplier * Math.max(12, 0.0005*$scope.fy*db);
		}
		else
		{
			return lengthMultiplier * Math.max(12, (0.0009*fy - 24)*db);
		}
	}
	
}]);