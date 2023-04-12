
  

// accessing display 1
var socket = new WebSocket("ws://cpsc484-01.yale.internal:8888/frames");

var host = "cpsc484-01.yale.internal:8888";

$(document).ready(function () {
    frames.start();
    twod.start();
});

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";

         // canvas object
         var c = document.getElementById("draw");
         var ctx = c.getContext("2d");
         // all real-world units are in mm unless denoted by CM
         var personRadiusCM = 30;
         // origin (x,y)
         var origin = [c.width/2, 0];
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }

        // clear the canvas
        ctx.clearRect(0, 0, c.width, c.height);

        // draw the camera on the top of the screen
        drawEnv(ctx, origin);

        // draw each person as a circle
        var i = 0;
        if (data.people) {
          var num_people = Object.keys(data.people).length;
          $('.people_counter').text(`I see ${num_people} people`);
          //console.log(num_people);
          for (const [idx, person] of Object.entries(data.people)) {
            // we want the data on the x,z plane from the camera's frame, so use indicies and 0 (x), 2 (Z)
            // see: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs
            // function definition is: arc(x, y, radius, startAngle, endAngle, counterclockwise)
            ctx.strokeStyle = ctx.fillStyle = colors[i++];
            ctx.beginPath();
            let person_x = -1 * toCM(person.avg_position[0]) + origin[0]
            let person_y = toCM(person.avg_position[2]) + origin[1]
            ctx.arc(person_x, person_y, personRadiusCM, 0, 2 * Math.PI);
            ctx.stroke();
            // draw an arrow for the person, if we have detected an angle
            if (person.theta) {
              ctx.beginPath();
              let th = person.theta;
              let arrow_x = person_x + Math.cos(th) * personRadiusCM;
              let arrow_y = person_y - Math.sin(th) * personRadiusCM;
              //console.log(arrow_x);
              //console.log(arrow_y);
              canvas_arrow(ctx, person_x, person_y, arrow_x, arrow_y);
              ctx.stroke();
            }
          }
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};


var twod = {
    socket: null,

    // create a connection to the camera feed
    start: function () {
        var url = "ws://" + host + "/twod";
        twod.socket = new WebSocket(url);

        // whenever a new frame is received...
        twod.socket.onmessage = function (event) {

            // parse and show the raw data
            twod.show(JSON.parse(event.data));
        }
    },

    // show the image by adjusting the source attribute of the HTML img object previously created
    show: function (twod) {
        $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
    },
};

 // Helper Functions

      // Convert MM to CM
      function toCM(mm) {
        return mm/10;
      }

      // Draw an arrow
      // from: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag#answer-6333775
      function canvas_arrow(context, fromx, fromy, tox, toy) {
        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        context.moveTo(fromx, fromy);
        context.lineTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
      }

      // Setup an array of colors
      var tc = tinycolor({
        r: Math.floor(Math.random() * 0xFF),
        g: Math.floor(Math.random() * 0xFF),
        b: Math.floor(Math.random() * 0xFF)
      });
      colors = [];
      var parts = 2 + Math.floor(Math.random() * 5);
      for (var i = 0; i < parts; i++) {
        tc = tc.spin(360 / parts);
        colors.push('#' + tc.toHex());
      }

      // Draw the environment
      function drawEnv(ctx, origin) {
        var cameraSizeCM = [15, 5];

        ctx.strokeStyle = ctx.fillStyle = '#333333';
        ctx.fillRect(origin[0], origin[1]-cameraSizeCM[1]/2, cameraSizeCM[0], cameraSizeCM[1])

        ctx.font = "25px Arial";
        ctx.fillText("x", 90, 20);
        ctx.fillText("y", 8, 100);
        ctx.beginPath();
        canvas_arrow(ctx, 14, 14, 14, 80);
        canvas_arrow(ctx, 14, 14, 80, 14);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = '#0000FF';
        canvas_arrow(ctx, origin[0]+cameraSizeCM[0]/2, 1.5, origin[0]+cameraSizeCM[0]/2, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = '#FF0000';
        canvas_arrow(ctx, origin[0]+cameraSizeCM[0]/2, 1.5, origin[0]+cameraSizeCM[0]/2-20, 1.5);
        ctx.stroke();
      }
