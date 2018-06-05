$(document).ready(function () {
    $('.sections').on('change', function(data) {
        var selected = $(this).val();
        $('.grid-section').empty();
        $('.site-header').addClass('header-up');
        $('#loading-gif').show();

        var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
        url += '?' + $.param({
            'api-key': "0a025eb8a8c04e34b0df1443720b590f"
        });
        $.ajax({
            url: url,
            method: 'GET',
        })

            .done(function (data) {
                var filterResults = data.results.filter(function (result) {
                    return result.multimedia.length;
                }).slice(0,12);

                $.each(filterResults, function (key, value) {
                    var articleLink = value.url;
                    var articleImage = value.multimedia[4].url;
                    var articleText = value.abstract;
                    var html = '';


                    html += '<a href=' + articleLink + '>';
                    html += '<div class="grid-stories">';
                    html += '<div class="background-img" style="background-image: url(' + articleImage + ')">';
                    html += '<div class="text-article">';
                    html += '<p>' + articleText + '</p></div></div>';
                    html += '</a>';

                    $('.grid-section').append(html);

                    $('#loading-gif').hide();
                });
            })

            .fail(function () {
                alert("Sorry, there is a problem");
            });

    })

})








