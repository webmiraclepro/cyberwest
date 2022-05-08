$(window).ready(function () {
  // Popup animation on roadmap page
  let roadmapGridWidth, roadmapGridHeight;

  // opening popup animation
  let currentElTop,
    currentElLeft,
    currentElHeight,
    currentElWidth,
    currentElOffsetTop,
    popupContentHeight = 0,
    popupHeight;
  $(".roadmap-grid .item .normal-content").on("click", function () {
    $(this).parents(".roadmap-grid").addClass("hide-first-img");

    let el = $(this).parents(".item").position();
    currentElHeight = $(this).parents(".item").height();
    currentElWidth = $(this).parents(".item").width();
    currentElTop = el.top;
    currentElLeft = el.left;

    // get popup children height on mobile
    if ($(window).width() < 768) {
      $(this)
        .siblings(".hidden-content")
        .children()
        .each(function () {
          popupContentHeight += $(this).outerHeight(true);
        });
    }

    // adjust popup height accordingly
    if (popupContentHeight + 60 > roadmapGridHeight) {
      popupHeight = popupContentHeight + 60;
      popupContentHeight = 0;
    } else {
      popupHeight = roadmapGridHeight;
    }

    $(this).parents(".item").addClass("expand").addClass("show-bg");
    $(this)
      .parents(".item")
      .find(".box")
      .css({ top: el.top, left: el.left, height: currentElHeight });
    $(this)
      .parents(".item")
      .find(".box")
      .stop()
      .animate(
        {
          width: roadmapGridWidth,
          height: popupHeight,
          top: 0,
          left: 0,
        },
        500,
        "linear",
        function () {
          $(this).parents(".item").addClass("show-content");
        }
      );

    // Scroll to top if on mobile
    if ($(window).width() < 768) {
      let distanceFromTopViewport =
        $(this).parents(".item").offset().top - $(window).scrollTop();
      currentElOffsetTop =
        $(this).parents(".item").offset().top - distanceFromTopViewport;

      $("html, body").animate(
        {
          scrollTop: $(".roadmap-grid").offset().top - 100,
        },
        1000
      );
    }
  });

  // Close popups
  $(".roadmap-grid .close-button").on("click", function (e) {
    $(this).parents(".roadmap-grid").removeClass("hide-first-img");

    $(this).parents(".item").removeClass("show-content");
    $(this)
      .parents(".box")
      .stop()
      .animate(
        {
          width: currentElWidth,
          height: currentElHeight,
          top: currentElTop,
          left: currentElLeft,
        },
        500,
        function () {
          $(this)
            .parents(".item")
            .removeClass("show-bg")
            .removeClass("expand")
            .find(".box")
            .css({ top: "0", left: "0" });
        }
      );

    // scroll back to prev item on mobile
    if ($(window).width() < 768) {
      $("html, body").animate(
        {
          scrollTop: currentElOffsetTop,
        },
        1000
      );
    }

    popupContentHeight = 0;
  });

  // Close popup by clicking outside of popup
  $("body").on("click", function (e) {
    if (!$(e.target).parents(".roadmap-grid").length) {
      $(".roadmap-grid .hidden-content").each(function () {
        if ($(this).find(".close-button").css("visibility") == "visible") {
          $(this).find(".close-button").click();
        }
      });
    }
  });

  // Journey Page - Placing gradient background below Stage 3
  function gradientCoverStageThree() {
    const stageThreeTop = $(".stage-three-top").offset().top;
    const stageFourTop = $(".stage-four-top").offset().top;
    const stageThreeHeight = stageFourTop - stageThreeTop;
    const bottomGradHeight = 825;
    $(".journey-section .journey-bottom-bg").css({
      height:
        stageThreeHeight > bottomGradHeight
          ? stageThreeHeight
          : bottomGradHeight,
      top: stageThreeTop,
    });
  }
  function animateJourneyBlocks() {
    $(".journey-block").each(function () {
      const topOfElement = $(this).offset().top;
      const bottomOfWindow = $(window).scrollTop() + $(window).height() - 30;
      if (bottomOfWindow > topOfElement) {
        $(this).addClass("visible-now");
      }
    });
    $(window).scroll(function () {
      $(".journey-block").each(function () {
        const topOfElement = $(this).offset().top;
        const bottomOfWindow = $(window).scrollTop() + $(window).height() - 30;
        if (bottomOfWindow > topOfElement) {
          $(this).addClass("visible-now");
        }
      });
    });
  }
  if ($("body").find(".journey-section").length > 0) {
    gradientCoverStageThree();
    animateJourneyBlocks();
    const windowWidth = $(window).width();
    $(window).on("resize", function () {
      if (windowWidth !== $(window).width()) {
        gradientCoverStageThree();
        animateJourneyBlocks();
      }
    });
  }
});


