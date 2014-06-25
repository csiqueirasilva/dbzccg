<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!doctype html>
<html lang="en">
    <head>
        <title>Game</title>
        <meta charset="utf-8">

        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans">

        <style>
            <%@include file="/build/dbzccg.min.css" %>
        </style>

        <style type="text/css">
            <%@include file="/css/site.css" %>
        </style>


        <script id="skybox_vertex_shader" type="x-shader/x-fragment">
            <%@include file="../../game/skyboxvertexshader.glsl"%>
        </script>
        <script id="skybox_fragment_shader" type="x-shader/x-fragment">
            <%@include file="../../game/skyboxfragmentshader.glsl"%>
        </script>

    </head>

    <body id='body' style="margin: 0; overflow: hidden;" oncontextmenu="return false;">

        <div id="renderer-wrapper">
        </div>

        <div id="object-info">
            <div id='display-object-screen' style='width: 35%; height: 100%; float: left;'>
            </div>

            <div style='text-align: justify; width: 65%; float: left;'>
                <div id='descriptionBox'>
                </div>

                <div id='descriptionBoxContent'>
                </div>
            </div>

            <div style='clear: both;'></div>
        </div>

        <button class='album-btn' id="next-page-button">Next Page (X)</button>

        <button class='album-btn' id='previous-page-button'>Previous Page (Z)</button>

        <!-- libs -->
        <script type="text/javascript" src="<c:url value="/build/dbzccg.min.js" />">
        </script>

        <!-- libs that require callbacks -->
<!--        <script src="http://www.youtube.com/iframe_api"></script>-->

        <script type="text/javascript">
            $(window).load(function() {
                DBZCCG.album('saiyan');
            });
        </script>

    </body>
</html>