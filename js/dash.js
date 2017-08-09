$(document).ready(function () {
    $tasks = JSON.parse(localStorage.getItem("tasks")); /** Get nas tarefas */

    var $finishedTaskCount = 0;
    var $openTaskCount = 0;
    var $lateTaskCount = 0;

    $.each($tasks, function (index, task) {
        if (task.status == "complete") {
            $finishedTaskCount += 1;
        } else if (task.status == "late") {
            $lateTaskCount += 1;
        } else if (task.status == "open") {
            $openTaskCount += 1;
        }
    });

    var ctx = document.getElementById("task-status-chart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Atrasadas", "Em aberto", "Concluídas"],
            datasets: [{
                label: 'Quantidade',
                data: [$lateTaskCount, $openTaskCount, $finishedTaskCount],
                backgroundColor: [
                    'rgba(255, 186, 186, 0.7)',
                    'rgba(183, 251, 155, 0.7)',
                    'rgba(189, 185, 255, 0.7)',

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});