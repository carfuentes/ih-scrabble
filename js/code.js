

var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};

var getRandomItem = function() {
    totalWeight= this.getWeights();
    var random_num = rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)

    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);

        if (random_num <= weight_sum) {
            return list[i];
        }
    }

    // end of function
};

var list = ['javascript', 'php', 'ruby', 'python'];
var weight = [0.5, 0.2, 0.2, 0.1];
var random_item = getRandomItem(list, weight);

console.log(random_item);
