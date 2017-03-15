angular
    .module('InterestCalculatorApp', [])
    .controller('InterestCalculatorCtrl', function InterestCalculatorCtrl($scope) {

        $scope.updateVals = function() {
            // Calculate single values
            var totalPayments = $scope.paymentsPerYear * $scope.years;
            var balance = $scope.initialBalance;

            var eir = ($scope.apr / $scope.paymentsPerYear) / 100; // Effective Interest Rate
            var periods = totalPayments;
            var monthlyPayment = balance * (eir / (1 - Math.pow(1 + eir,-periods)));

            // Format values for output
            $scope.effectiveInterestRate = $scope.apr / $scope.paymentsPerYear;
            $scope.totalPayments = totalPayments;
            $scope.monthlyPayment = monthlyPayment;

            // Calculate payment table
            $scope.totalPrinciple = 0;
            $scope.totalInterest = 0;
            $scope.resultTable = [];
            for (var x = 1; x <= periods; x++) {
                var interest = balance * eir;
                $scope.totalInterest += interest;
                var principle = monthlyPayment - interest;
                $scope.totalPrinciple += principle;
                var startingPrinciple = balance;
                var remainingPrinciple = balance - principle;
                balance = remainingPrinciple;

                var paymentRes = {};
                paymentRes.num = x;
                paymentRes.startingPrinciple = startingPrinciple;
                paymentRes.interest = interest;
                paymentRes.principle = principle;
                paymentRes.remainingPrinciple = remainingPrinciple;
                $scope.resultTable.push(paymentRes);
            }
        };

        $scope.initialBalance = 1000;
        $scope.apr = 5.99;
        $scope.paymentsPerYear = 12;
        $scope.years = 10;
        $scope.updateVals();


});
