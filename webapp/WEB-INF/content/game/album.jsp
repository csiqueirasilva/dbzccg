<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script id="skybox_vertex_shader" type="x-shader/x-fragment">
    <%@include file="../../../game/skyboxvertexshader.glsl"%>
</script>
<script id="skybox_fragment_shader" type="x-shader/x-fragment">
    <%@include file="../../../game/skyboxfragmentshader.glsl"%>
</script>

<div id="renderer-wrapper">
</div>

<button class='btn btn-default album-btn' id="next-page-button">Next Page (X)</button>

<button class='btn btn-default album-btn' id='previous-page-button'>Previous Page (Z)</button>

<script type="text/javascript">
    $(window).load(function() {
        DBZCCG.album('saiyan');
    });
</script>