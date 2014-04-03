<!-- caching images -->
<img src='images/html/image-main-album-description.jpg' style='display: none;'/>

<div id="main-description-image">
    <button id="btn-demo" class="main-description-btn btn btn-inverse" href="game.htm">PLAY THE DEMO</button>
    <button id="btn-demo-album" class="main-description-btn btn btn-info" href="album.htm">THE SAIYAN SAGA ALBUM</button>

    <div id='main-description-image-overlay'>
        <h2 class='title'></h2>
        <span class='description'></span>
    </div>
    
    <script>
        (function() {
            $('.main-description-btn').click(function() {
                window.location.href = $(this).attr('href');
            });

            var o = {
                'btn-demo': {
                    background: 'images/html/image-main-description.jpg',
                    title: 'PLAY NOW',
                    description: 'Play against the AI featuring two decks using random Saiyan Saga cards!'
                },
                'btn-demo-album': {
                    background: 'images/html/image-main-album-description.jpg',
                    title: 'THE SAIYAN SAGA CARD ALBUM',
                    description: 'Browse through the implemented Saiyan Saga cards.'
                }};
    

            $('.main-description-btn').mouseover(function() {
                var id = $(this).attr('id');
                $('#main-description-image').css('background', "url('" + o[id].background + "')");
                $('#main-description-image').css('background-position', "center");
                $('#main-description-image-overlay > .title').html(o[id].title);
                $('#main-description-image-overlay > .description').html(o[id].description);
            });
            
            // default
            $('#btn-demo').trigger('mouseover');
        })();
    </script>
</div>

<h2 id='content-title'>PROJECT INTRODUCTION</h2>

<div class='content-line' style='text-align: justify;'>
    <p>This is a fan project that aims to recreate the Score Dragonball Z Collectible Card Game into a browser game via WebGL.</p>
    <p>The goal is to achieve a game that can manage player card collections, ladder positions, host scheduled tournaments and different play styles.</p>
    <p>We are working in collaboration with <a href='http://dragonballzocg.com'>Dragonball Z Online Card Game</a>.
</div>

<h2 id="content-title">A FEW FEATURES</h2>

<div class="content-line">
    <div>
        <img title='Styles' src="images/html/styles-showcase.jpg" />
        <div>
            <p>Rediscover all the styles! You can build a deck around a style of your choice.</p>
        </div>
    </div>

    <div>
        <img title='Personalities' src="images/html/personality-showcase.jpg" />
        <div>
            <p>Play with Villains, Heroes and Rogue personalities (Rogue personalities can be both Heroes and Villains).</p>
        </div>
    </div>

    <div>
        <img title='Senseis' src="images/html/sensei-showcase.jpg" />
        <div>
            <p>Use a Sensei card to grant your character another advantage.</p>
        </div>
    </div>

    <div>
        <img title='Locations/Battlegrounds' src="images/html/location-showcase.jpg" />
        <div>
            <p>Locations and Battlegrounds cards can put yourself into an advantage towards your opponent (if you build your deck around it).</p>
        </div>
    </div>
</div>