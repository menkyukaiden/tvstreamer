window.addEventListener("load", () => {
    const socket = io();
    var context = {}

    socket.on('home', (data) => {
        console.log(data.memory);
        context = data;

        //updateConfigByMutating(chart2, data.memory, data.memorynow, 'Memory Usage %', 'rgb(22, 200, 22)');
        //updateConfigByMutating(chart, data.cpu, data.cpunow, 'CPU Usage %', 'rgb(75, 192, 192)');

    });

        
    setInterval(()=> {
        updateConfigByMutating(chart2, context.memory, context.memorynow, 'Memory Usage %', 'rgb(22, 200, 22)', 'rgba(22, 200, 22, 0.1)');
        updateConfigByMutating(chart, context.cpu, context.cpunow, 'CPU Usage %', 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.1)');
    }, 100)
    

    var ctx = document.getElementById('mychart').getContext('2d');
    var ctx2 = document.getElementById('mychart2').getContext('2d');
    var ctx3 = document.getElementById('mychart3').getContext('2d');
    var ctx4 = document.getElementById('mychart4').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'CPU Usage %',
                data: [0],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                lineTension: 0.1,
                borderWidth: 1
            }],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        options: {
            animation: {
                duration: 0,
            },
                
            responsive: true,
            title: {
                display: true,
                text: "CPU",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 25
                    }
                }]
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });

    let chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Memory Usage %',
                data: [0],
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                lineTension: 0.1,
                borderWidth: 1
            }],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        options: {
            animation: {
                duration: 0,
            },
                
            responsive: true,
            title: {
                display: true,
                text: "Memory",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 25
                    }
                }]
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
    

    let chart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Interface 1 dB %',
                data: [65,59,80,81,56,55,0],
                fill: false,
                borderColor: 'rgb(22, 200, 22)',
                lineTension: 0.1,
                borderWidth: 1
            }],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 25
                    }
                }]
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });

    let chart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Interface 2 dB %',
                data: [65,59,80,81,56,55,40],
                fill: false,
                borderColor: 'rgb(1, 33, 79)',
                lineTension: 0.1,
                borderWidth: 1
            }],
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 25
                    }
                }]
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
    function updateConfigByMutating(chart, data, now, label, color, bgcolor) {

        chart.data.datasets = [{
            label: `${label} ${now}`,
            data: data,
            fill: true,
            borderColor: color,
            backgroundColor: bgcolor,
            lineTension: 0.1,
            borderWidth: 1
        }],

        chart.update();
    }
})
