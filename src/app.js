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
            $scope.initialBalanceStr = accounting.formatMoney($scope.initialBalance);
            $scope.effectiveInterestRateStr = ($scope.apr / $scope.paymentsPerYear).toFixed(2);
            $scope.totalPayments = totalPayments;
            $scope.monthlyPaymentStr = accounting.formatMoney(monthlyPayment);

            // Calculate payment table
            $scope.resultTable = [];
            for (var x = 1; x <= periods; x++) {
                var interest = balance * eir;
                var principle = monthlyPayment - interest;
                var remainingPrinciple = balance - principle;
                balance = remainingPrinciple;

                var paymentRes = {};
                paymentRes.num = x;
                paymentRes.startingPrinciple = accounting.formatMoney(balance);
                paymentRes.interest = interest.toFixed(2);
                paymentRes.principle = accounting.formatMoney(principle);
                paymentRes.remainingPrinciple = accounting.formatMoney(remainingPrinciple);
                $scope.resultTable.push(paymentRes);
            }
        };

        $scope.initialBalance = 1000;
        $scope.apr = 5.99;
        $scope.paymentsPerYear = 12;
        $scope.years = 10;
        $scope.updateVals();


});
