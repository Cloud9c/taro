import {
	App,
	Entity,
	Scene,
	Loader,
	Color,
	Fog,
	FogExp2,
	ComponentManager,
	Vector2,
	Vector3,
	Vector4,
	LoaderUtils,
	FileLoader
} from '../../build/taro.module.js';

export class TaroLoader extends Loader {

	constructor() {

		super();
		this.queue = [];
		this.disableQueue = [];
		this.parsingScene = false;

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const path = ( this.path === '' ) ? LoaderUtils.extractUrlBase( url ) : this.path;
		this.resourcePath = this.resourcePath || path;

		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );
		loader.load( url, function ( text ) {

			let json = null;

			try {

				json = JSON.parse( text );

			} catch ( error ) {

				if ( onError !== undefined ) onError( error );

				console.error( 'TaroLoader: Can\'t parse ' + url + '.', error.message );

				return;

			}

			scope.parse( json, onLoad );

		}, onProgress, onError );

	}

	parse( json, onLoad ) {

		const app = this.app = new App( json.parameters );
		this._componentManager = this.app.componentManager;
		const scenes = json.scenes;

		for ( let i = 0, len = scenes.length; i < len; i ++ ) {

			const scene = this.parseScene( scenes[ i ], app );

			if ( scene.uuid === json.currentScene )
				app.setScene( scene );

		}

		for ( const component of this.disableQueue )
			component.enabled = false;

		this.disableQueue = [];

		onLoad( app );

		return app;

	}

	parseScene( data, app ) {

		this.parsingScene = true;

		const scene = new Scene();

		app.addScene( scene );

		scene.uuid = data.uuid;

		if ( data.background !== undefined ) {

			if ( Number.isInteger( data.background ) ) {

				scene.background = new Color( data.background );

			}

		}

		if ( data.fog !== undefined ) {

			if ( data.fog.type === 'Fog' ) {

				scene.fog = new Fog( data.fog.color, data.fog.near, data.fog.far );

			} else if ( data.fog.type === 'FogExp2' ) {

				scene.fog = new FogExp2( data.fog.color, data.fog.density );

			}

		}

		if ( data.children !== undefined ) {

			const children = data.children;
			for ( let i = 0, len = children.length; i < len; i ++ ) {

				this.parseEntity( children[ i ], scene );

			}

			scene.add( ...this.queue );
			this.queue = [];

		}

		this.parsingScene = false;

		return scene;

	}

	parseEntity( data, parent ) {

		let object;

		if ( this.parsingScene && parent.isScene === true ) {

			object = new Entity( data.name, false );
			this.queue.push( object );

		} else {

			object = new Entity( data.name, parent );

		}

		object.uuid = data.uuid;
		object.matrix.fromArray( data.matrix );
		object.matrix.decompose( object.position, object.quaternion, object.scale );

		if ( data.castShadow !== undefined ) object.castShadow = data.castShadow;
		if ( data.receiveShadow !== undefined ) object.receiveShadow = data.receiveShadow;
		if ( data.visible !== undefined ) object.visible = data.visible;
		if ( data.enabled !== undefined )
			object.enabled = data.enabled;

		if ( data.components !== undefined ) {

			const components = data.components;
			for ( let i = 0, len = components.length; i < len; i ++ ) {

				const type = components[ i ].type;
				const data = components[ i ].data;
				const schema = ComponentManager.components[ type ].config.schema;
				// convert vector JSONs to actual vector classes (also color)
				if ( schema !== undefined ) {

					for ( const name in data ) {

						switch ( schema[ name ].type ) {

							case 'vector2':
								data[ name ] = new Vector2( data[ name ].x, data[ name ].y );
								break;
							case 'vector3':
								data[ name ] = new Vector3( data[ name ].x, data[ name ].y, data[ name ].z );
								break;
							case 'vector4':
								data[ name ] = new Vector4( data[ name ].x, data[ name ].y, data[ name ].z, data[ name ].w );
								break;
							case 'color':
								data[ name ] = new Color( data[ name ] );
								break;

						}

					}

				}

				const component = object.addComponent( type, data );
				component.uuid = components[ i ].uuid;

				if ( !components[ i ].enabled )
					this.disableQueue.push( component )

			}

		}

		if ( data.children !== undefined ) {

			const children = data.children;
			for ( let i = 0, len = children.length; i < len; i ++ )
				this.parseEntity( children[ i ], object );


		}

		return object;

	}

}
