import * as TARO from 'taro';

import { UIPanel, UIRow, UIHorizontalRule } from './libs/ui.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';

function MenubarAdd( editor ) {

	const strings = editor.strings;

	const container = new UIPanel();
	container.setClass( 'menu' );

	const title = new UIPanel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/add' ) );
	container.add( title );

	const options = new UIPanel();
	options.setClass( 'options' );
	container.add( options );

	// Group

	let option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/group' ) );
	option.onClick( function () {

		const mesh = new TARO.Group();
		mesh.name = 'Group';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	//

	options.add( new UIHorizontalRule() );

	// Box

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/box' ) );
	option.onClick( function () {

		const geometry = new TARO.BoxGeometry( 1, 1, 1, 1, 1, 1 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Box';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Circle

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/circle' ) );
	option.onClick( function () {

		const geometry = new TARO.CircleGeometry( 1, 8, 0, Math.PI * 2 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Circle';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Cylinder

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/cylinder' ) );
	option.onClick( function () {

		const geometry = new TARO.CylinderGeometry( 1, 1, 1, 8, 1, false, 0, Math.PI * 2 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Cylinder';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Dodecahedron

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/dodecahedron' ) );
	option.onClick( function () {

		const geometry = new TARO.DodecahedronGeometry( 1, 0 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Dodecahedron';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Icosahedron

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/icosahedron' ) );
	option.onClick( function () {

		const geometry = new TARO.IcosahedronGeometry( 1, 0 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Icosahedron';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Lathe

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/lathe' ) );
	option.onClick( function () {

		const geometry = new TARO.LatheGeometry();
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial( { side: TARO.DoubleSide } ) );
		mesh.name = 'Lathe';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Octahedron

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/octahedron' ) );
	option.onClick( function () {

		const geometry = new TARO.OctahedronGeometry( 1, 0 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Octahedron';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Plane

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/plane' ) );
	option.onClick( function () {

		const geometry = new TARO.PlaneGeometry( 1, 1, 1, 1 );
		const material = new TARO.MeshStandardMaterial();
		const mesh = new TARO.Mesh( geometry, material );
		mesh.name = 'Plane';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Ring

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/ring' ) );
	option.onClick( function () {

		const geometry = new TARO.RingGeometry( 0.5, 1, 8, 1, 0, Math.PI * 2 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Ring';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Sphere

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/sphere' ) );
	option.onClick( function () {

		const geometry = new TARO.SphereGeometry( 1, 32, 16, 0, Math.PI * 2, 0, Math.PI );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Sphere';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Sprite

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/sprite' ) );
	option.onClick( function () {

		const sprite = new TARO.Sprite( new TARO.SpriteMaterial() );
		sprite.name = 'Sprite';

		editor.execute( new AddObjectCommand( editor, sprite ) );

	} );
	options.add( option );

	// Tetrahedron

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/tetrahedron' ) );
	option.onClick( function () {

		const geometry = new TARO.TetrahedronGeometry( 1, 0 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Tetrahedron';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Torus

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/torus' ) );
	option.onClick( function () {

		const geometry = new TARO.TorusGeometry( 1, 0.4, 8, 6, Math.PI * 2 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Torus';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// TorusKnot

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/torusknot' ) );
	option.onClick( function () {

		const geometry = new TARO.TorusKnotGeometry( 1, 0.4, 64, 8, 2, 3 );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'TorusKnot';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	// Tube

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/tube' ) );
	option.onClick( function () {

		const path = new TARO.CatmullRomCurve3( [
			new TARO.Vector3( 2, 2, - 2 ),
			new TARO.Vector3( 2, - 2, - 0.6666666666666667 ),
			new TARO.Vector3( - 2, - 2, 0.6666666666666667 ),
			new TARO.Vector3( - 2, 2, 2 )
		] );

		const geometry = new TARO.TubeGeometry( path, 64, 1, 8, false );
		const mesh = new TARO.Mesh( geometry, new TARO.MeshStandardMaterial() );
		mesh.name = 'Tube';

		editor.execute( new AddObjectCommand( editor, mesh ) );

	} );
	options.add( option );

	/*
	// Teapot

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( 'Teapot' );
	option.onClick( function () {

		let size = 50;
		let segments = 10;
		let bottom = true;
		let lid = true;
		let body = true;
		let fitLid = false;
		let blinnScale = true;

		let material = new TARO.MeshStandardMaterial();

		let geometry = new TeapotGeometry( size, segments, bottom, lid, body, fitLid, blinnScale );
		let mesh = new TARO.Mesh( geometry, material );
		mesh.name = 'Teapot';

		editor.addObject( mesh );
		editor.select( mesh );

	} );
	options.add( option );
	*/

	//

	options.add( new UIHorizontalRule() );

	// AmbientLight

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/ambientlight' ) );
	option.onClick( function () {

		const color = 0x222222;

		const light = new TARO.AmbientLight( color );
		light.name = 'AmbientLight';

		editor.execute( new AddObjectCommand( editor, light ) );

	} );
	options.add( option );

	// DirectionalLight

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/directionallight' ) );
	option.onClick( function () {

		const color = 0xffffff;
		const intensity = 1;

		const light = new TARO.DirectionalLight( color, intensity );
		light.name = 'DirectionalLight';
		light.target.name = 'DirectionalLight Target';

		light.position.set( 5, 10, 7.5 );

		editor.execute( new AddObjectCommand( editor, light ) );

	} );
	options.add( option );

	// HemisphereLight

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/hemispherelight' ) );
	option.onClick( function () {

		const skyColor = 0x00aaff;
		const groundColor = 0xffaa00;
		const intensity = 1;

		const light = new TARO.HemisphereLight( skyColor, groundColor, intensity );
		light.name = 'HemisphereLight';

		light.position.set( 0, 10, 0 );

		editor.execute( new AddObjectCommand( editor, light ) );

	} );
	options.add( option );

	// PointLight

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/pointlight' ) );
	option.onClick( function () {

		const color = 0xffffff;
		const intensity = 1;
		const distance = 0;

		const light = new TARO.PointLight( color, intensity, distance );
		light.name = 'PointLight';

		editor.execute( new AddObjectCommand( editor, light ) );

	} );
	options.add( option );

	// SpotLight

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/spotlight' ) );
	option.onClick( function () {

		const color = 0xffffff;
		const intensity = 1;
		const distance = 0;
		const angle = Math.PI * 0.1;
		const penumbra = 0;

		const light = new TARO.SpotLight( color, intensity, distance, angle, penumbra );
		light.name = 'SpotLight';
		light.target.name = 'SpotLight Target';

		light.position.set( 5, 10, 7.5 );

		editor.execute( new AddObjectCommand( editor, light ) );

	} );
	options.add( option );

	//

	options.add( new UIHorizontalRule() );

	// OrthographicCamera

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/orthographiccamera' ) );
	option.onClick( function () {

		const aspect = editor.camera.aspect;
		const camera = new TARO.OrthographicCamera( - aspect, aspect );
		camera.name = 'OrthographicCamera';

		editor.execute( new AddObjectCommand( editor, camera ) );

	} );
	options.add( option );

	// PerspectiveCamera

	option = new UIRow();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/perspectivecamera' ) );
	option.onClick( function () {

		const camera = new TARO.PerspectiveCamera();
		camera.name = 'PerspectiveCamera';

		editor.execute( new AddObjectCommand( editor, camera ) );

	} );
	options.add( option );

	return container;

}

export { MenubarAdd };
