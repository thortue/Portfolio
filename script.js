$(window).ready(function () {
  function simulateLoading() {
    var progressBar = $("#progress-bar");
    var loadingCount = 0;

    function fillProgressBar() {
      progressBar.animate({ width: "80%" }, 8000, function () {
        loadingCount++;
        if (loadingCount < 3) {
          // Animation terminée, réinitialiser la barre et relancer
          progressBar.css("width", "0");
          fillProgressBar();
        }
      });
    }

    fillProgressBar();
  }

  simulateLoading();

  $(".button").css({ bottom: 100, right: 100 }); // Position initiale

  $(".button").draggable({
    containment: "body", // Empêche le bouton de sortir de la balise body
    start: function (event, ui) {
      $(this).css("transition", "none");
    },
    drag: function (event, ui) {
      var buttonRight = ui.position.left + $(this).width();
      var windowRight = $(window).width();

      // Vérifiez si le bouton atteint la bordure droite de la fenêtre
      if (buttonRight > windowRight) {
        // Ajustez la position pour l'empêcher de dépasser
        ui.position.left -= buttonRight - windowRight;
      }
    },
    start: function (event, ui) {
      $(this).css("transition", "none");
    },
    stop: function (event, ui) {
      $(this).css("transition", "transform 0.3s ease-in-out");
    },
  });

  // Fonction pour calculer la distance entre deux points
  function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  $(document).mousemove(function (e) {
    var button = $(".button");
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    var buttonX = button.offset().left + button.width() / 2;
    var buttonY = button.offset().top + button.height() / 2;
    var distance = getDistance(mouseX, mouseY, buttonX, buttonY);

    if (distance < 150) {
      // Si la souris est dans la zone aimant
      button.css({
        transform: "scale(1.2)",
        background: "#096929", // Ajout de couleur
      });
    } else {
      // Si la souris n'est pas dans la zone aimant
      button.css({
        transform: "scale(1)",
        background: "", // Retrait de couleur
      });
    }
  });

  // Réinitialiser l'effet d'aimantation lorsque la souris quitte la zone du bouton
  $(".button").mouseleave(function () {
    $(".button").css({ transform: "scale(1)" });
  });
});
