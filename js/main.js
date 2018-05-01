$(document).ready(function () {

    $('.loading-gif').hide();
    $(document).ready(function () {
      $(function () {
  
        var storiesList = $('#story-item')
  
        $('select').change(function () {
          $(storiesList).empty();
          $('.content-wrapper').removeClass('content-wrapper-alt')
          $('.loading-gif').show();
          $('.content-wrapper').addClass('content-wrapper-alt');
  
          var url = 'https://api.nytimes.com/svc/topstories/v2/';
          url += $(this).val();
          url += '.json';
          url += '?' + $.param({ 'api-key': '0a025eb8a8c04e34b0df1443720b590f' });
  
          $.ajax({
            url: url,
            method: 'GET',
          })
            .done(function (data) {
              function validArticle(entry) {
                return entry.multimedia.length;
              }
              var articleGroup = data.results.filter(validArticle)
              articleGroup.splice(12);
              var appendItem = '';
              $.each(articleGroup, function (item, value) {
                var url = value.url;
                var pic = value.multimedia[4].url;
                var caption = value.abstract;
                appendItem += '<li class="story-box" style="background-image: url(';
                appendItem += pic;
                appendItem += ')"><a href="';
                appendItem += url;
                appendItem += '"><div class="text-box"><p>';
                appendItem += caption;
                appendItem += '</p></div></a></li>';
              });
  
              $('.loading-gif').hide();
              $('#story-item').append(appendItem);
            })
  
            .fail(function () {
              $('.loading-gif').hide();
              $('#story-item').append(
                '<h1>No stories available...</h1>'
              )
            });
        });
      });
    });
  });
  