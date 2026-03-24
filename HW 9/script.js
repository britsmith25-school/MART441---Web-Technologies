$(document).ready(function () {

  let content = [
    { img: "images/RestlessMind.png", text: "My mind won’t turn off" },
    { img: "images/FeelingBehind.png", text: "I am so far behind" },
    { img: "images/Burden.png", text: "I don't want to be a burden" },
    { img: "images/Silence.png", text: "Silence is possible" },
    { img: "images/OwnPath.png", text: "I will still get to where I need to be" },
    { img: "images/Helping.png", text: "I am not a burden" }
  ];

  let index = 0;

  function cycleContent() {

    $("#mainImage").fadeOut(1000);
    $("#textBox").fadeOut(500);

    setTimeout(function () {

      index = (index + 1) % content.length;

      let current = content[index];
      let isChaos = index < 3;

      $("#mainImage").attr("src", current.img);
      $("#textBox").text(current.text);

      let imgWidth = 350;
      let imgHeight = 350;

      let x = Math.random() * (window.innerWidth - imgWidth);
      let y = Math.random() * (window.innerHeight - imgHeight - 120);

      $("#mainImage").css({ top: y, left: x });
      let textY = y + imgHeight + 20;

      if (textY > window.innerHeight - 50) {
         textY = y - 40;
      }

      $("#textBox").css({
         top: textY,
         left: x
    });

      if (isChaos) {
        $("#mainImage").fadeIn(1000).animate({
          left: "+=" + (Math.random() * 200 - 100),
          top: "+=" + (Math.random() * 200 - 100)
        }, 800);
      } else {
        $("#mainImage").fadeIn(1000).animate({
          left: x + 50,
          top: y + 50
        }, 2000);
      }

      $("#textBox").fadeIn(500);

    }, 1000);
  }

  setInterval(cycleContent, 4000);


  let shapes = [
    { color: "#E63946", borderRadius: "0%", size: 100 },
    { color: "#9B2226", borderRadius: "10%", size: 120 },
    { color: "#6A040F", borderRadius: "0%", size: 80 },
    { color: "#A8DADC", borderRadius: "50%", size: 100 },
    { color: "#457B9D", borderRadius: "30%", size: 120 },
    { color: "#90BE6D", borderRadius: "50%", size: 80 }
  ];

  let shapeIndex = 0;

  function cycleShape() {
    shapeIndex = (shapeIndex + 1) % shapes.length;

    let shape = shapes[shapeIndex];
    let isChaos = shapeIndex < 3;

    $("#shape").fadeOut(500, function () {

      $("#shape").css({
        background: shape.color,
        borderRadius: shape.borderRadius,
        width: shape.size,
        height: shape.size
      });

      let x = Math.random() * (window.innerWidth - 100);
      let y = Math.random() * (window.innerHeight - 100);

      $("#shape").css({ top: y, left: x });

      if (isChaos) {
        $("#shape").fadeIn(300).animate({
          left: "+=" + (Math.random() * 200 - 100),
          top: "+=" + (Math.random() * 200 - 100)
        }, 600);
      } else {
        $("#shape").fadeIn(800).animate({
          left: x + 100,
          top: y + 100
        }, 2000);
      }
    });
  }

  setInterval(cycleShape, 2500);

});