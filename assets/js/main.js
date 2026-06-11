if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
  new WOW().init();
}

$(function () {
  // lazyload
  $("div.lazy, section.lazy, img.lazy").lazyload({
    threshold: 20
  });

  // mobile-nav Start
  $(".menu-handler").click(function () {
    $(".block-bg,.mobile-menu").addClass("menu-on");
  });
  $(".menu-close, .block-bg").click(function () {
    $(".block-bg,.mobile-menu").removeClass("menu-on");
  });
  $(".mobile-menu .primary-menu > .menu-list > .dd-trigger").click(function () {
    if (!$(".sub-menu").is(":animated")) {
      $(this).parent("li").toggleClass("on").siblings().removeClass("on");
      $(this).parent("li").siblings().children('.sub-menu').slideUp();
      $(this).parent("li").children(".sub-menu").slideToggle();
    }
    return false;
  });
  $(".mobile-menu .primary-menu > .menu-list > .sub-menu > .menu-list > .dd-trigger").click(function () {
    if (!$(".sub-menu").is(":animated")) {
      $(this).parent("li").toggleClass("on").siblings().removeClass("on");
      $(this).parent("li").siblings().children('.sub-menu').slideUp();
      $(this).parent("li").children(".sub-menu").slideToggle();
    }
    return false;
  });
  // mobile-nav End


  // back to top

  function el(el) {
    return document.querySelector(el);
  }

  if (el('.scroll_to_top')) {
    el('.scroll_to_top').onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  window.onscroll = function (e) {
    let topdistance = document.documentElement.scrollTop || document.body.scrollTop;
    if ($('.scroll_to_top')) {
      if (topdistance > 800) {
        $('.scroll_to_top').addClass('active');
      } else {
        $('.scroll_to_top').removeClass('active');
      }
    }
  }
  // back to top

  //Language Box
  if ($('.language').length) {
    $('.language').on('click', function () {
      $(this).toggleClass('active');
      $(this).find('.lang-dropdown').toggleClass('now-visible');
    });
  }

  // mobile nav
  $(".menu-handler").click(function () {
    $(".block-bg,.mobile-menu").addClass("menu-on");
  });
  $(".menu-close, .block-bg").click(function () {
    $(".block-bg,.mobile-menu").removeClass("menu-on");
  });
  $(".dd-trigger").click(function () {
    if (!$(".sub-menu").is(":animated")) {
      $(this).parents("li").toggleClass("on").siblings().removeClass("on");
      $(this).parents("li").siblings().find('.sub-menu').slideUp();
      $(this).parents("li").find(".sub-menu").slideToggle();
    }
    return false;
  });

  // 设置视频高度

  // Fixed header.
  $(window).on('resize', function () {
    fixedHeader();
  });

  function fixedHeader() {
    var stickyOffsetTop = $('.sticky-enabled')[0].offsetTop;
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > stickyOffsetTop && !($('.sticky-enabled').hasClass('sticky-header'))) {
        $('.sticky-enabled').addClass('sticky-header');
      } else if ($(window).scrollTop() <= stickyOffsetTop) {
        $('.sticky-enabled').removeClass('sticky-header');
      }
    });
  }

  fixedHeader();

  // searchbox
  $('.searchbox>.fa-search').click(function (e) {
    var f = $(this).data('flag');
    if (f == false) {
      $(this).data('flag', true);
      $('.search-g-box').fadeIn(100);
    } else {
      $(this).data('flag', false);
      $('.search-g-box').fadeOut(100);
    }
  });

  $(document).click(function (e) {
    $('.search-g-box').fadeOut(100);
    $('.searchbox>.fa-search').data('flag', false);
  });

  $('.search-g-box, .searchbox>.fa-search').click(function (e) {
    e = e || window.event;
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  })

    function sentDatas(event, str_content) {
        $.ajax({
            type: 'POST',
            url: HOME_URL + '/eventSend',
            headers: {
                'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
            },
            data: {'event': event},
            dataType: 'json',
            success: function (json) {
                if (json) {

                }
            }
        })
    }

    function sentData(event, str) {
        try {
            if (sentDatas && "function" == typeof sentDatas) {
                var curr_str = "";
                if ("copy" == event || "email_copy" == event) {
                    curr_str = window.getSelection ? window.getSelection() : document.selection.createRange().text;
                    curr_str = curr_str.toString();
                    sentDatas(event, curr_str)
                } else sentDatas(event, str)
            }
        } catch (t) {}
    }

    function event(t, e) {
        if (t) {
            if (t.startsWith("mailto:")) sentData(`email_${e}`)
            if (t.startsWith("https://api.whatsapp.com/send")) sentData(`whatsapp_${e}`)
            if (t.startsWith("https://www.facebook.com/sharer")) sentData(`facebook_${e}`)
            if (t.startsWith("https://twitter.com/intent/tweet")) sentData(`twitter_${e}`)
            if (t.startsWith("skype:")) sentData(`skype_${e}`)
            if (t.startsWith("https://www.linkedin.com/shareArticle") || t.startsWith("http://www.linkedin.com/shareArticle")) sentData(`linkedin_${e}`)
            if (t.startsWith("https://plus.google.com/share")) sentData(`google_${e}`)
            if (t.startsWith("https://www.youtube.com")) sentData(`youtube_${e}`)
            if (t.startsWith("https://www.instagram.com")) sentData(`instagram_${e}`)
            if (t.startsWith("tel:")) sentData(`phone_${e}`)
        }
    }

    $("a").on("click", (function() {
        event($(this).attr("href"), "click")
    })), $("a").on("copy", (function() {
        event($(this).attr("href"), "copy")
    }))
})

$(document).ready(function () {
    toggleClass(getCookie('prolist'))

    $("#ert").click(function () {
        toggleClass(1)
        setCookie("prolist", "1", 30)
    });

    $("#uioi").click(function () {
        toggleClass(2)
        setCookie("prolist", "2", 30)
    });
})

function toggleClass(value) {
    if (value == 1) {
        $(".product-list").removeClass("show-detail");
        $(".poorder .list span").addClass("current");
        $(".poorder .list1 span").removeClass("current");
    } else if (value == 2) {
        $(".product-list").addClass("show-detail");
        $(".poorder .list span").removeClass("current");
        $(".poorder .list1 span").addClass("current");
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}


// 内页手机端端 做的导航弹出特效
$(".xymob-page-navbtn").click(function () {
  $(".xymob-menu-click").addClass('click');
  $('html,body').addClass('no-scroll');
});
$(".xymob-left-close-btn").click(function () {
  $(".xymob-menu-click").removeClass('click');
  $('html,body').removeClass('no-scroll');
});

// 内页左侧导航栏点击特效
$(".first-nav-btn").click(function () {
  var boxa = $(this).siblings('.xypg-left-subnav');
  var parbox = $(this).parents('li');
  var parSibBox = $(this).parents('li').siblings('li');
  var boxb = $(this).parents('li').siblings('li').find('.xypg-left-subnav');
  var jta = $(this).parents('li').siblings('li').find('.first-nav-btn');

  var subLiLen = boxa.find('li').length;
  if (subLiLen == 0) {
    return false
  }
  if (!boxa.is(":visible")) {
    boxa.slideDown();
    parbox.addClass('clicked');
    $(this).addClass('clicked');
    boxb.slideUp();
    jta.removeClass('clicked');
    parSibBox.removeClass('clicked');
  } else {
    boxa.slideUp();
    $(this).removeClass('clicked');
    parbox.removeClass('clicked');
  }
});



//返回头部
$(".to_top2").click(function () { //当点击跳转链接后，回到页面顶部位置
  $('body,html').animate({
    scrollTop: 0
  }, 400);
  return false;
});




//返回顶部
$('.xymob-page-backtop').click(function () {
  $('html, body').animate({
    scrollTop: '0'
  }, 300);
});

// 内页左侧当前分类颜色高亮
$(".xypg-left-nav li a[href='" + window.location.href + "']").closest('li').addClass('clicked');