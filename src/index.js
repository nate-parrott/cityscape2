import { testRouting } from './tests';

testRouting();

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
